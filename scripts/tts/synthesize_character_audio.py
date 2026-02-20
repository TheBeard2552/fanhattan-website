#!/usr/bin/env python3
"""
Synthesize character narration audio using Coqui TTS.

Reads narration .txt files from .generated/narration/characters/<slug>.txt
and writes one WAV file per character to public/audio/characters/<slug>.wav.

Files are skipped when the WAV is newer than the source .txt (incremental).
Use --force to re-generate everything.

Usage:
    python scripts/tts/synthesize_character_audio.py [--force] [--model MODEL]

Default model: tts_models/en/ljspeech/vits  (single-speaker, English, good quality)

Other good single-speaker English models to try:
  tts_models/en/ljspeech/tacotron2-DDC_ph
  tts_models/en/vctk/vits          (multi-speaker; add --speaker_idx p270)

List all available models:
  python -c "from TTS.api import TTS; print(TTS().list_models())"
"""

import argparse
import os
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Synthesize character audio with Coqui TTS")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-generate all audio even if output is newer than input",
    )
    parser.add_argument(
        "--model",
        default="tts_models/en/ljspeech/vits",
        help="Coqui TTS model name (default: tts_models/en/ljspeech/vits)",
    )
    parser.add_argument(
        "--speaker",
        default=None,
        help="Speaker ID for multi-speaker models (e.g. p270 for vctk/vits)",
    )
    return parser.parse_args()


def is_stale(input_path: Path, output_path: Path, force: bool) -> bool:
    if force:
        return True
    if not output_path.exists():
        return True
    return input_path.stat().st_mtime > output_path.stat().st_mtime


def main() -> None:
    args = parse_args()

    repo_root = Path(__file__).resolve().parent.parent.parent
    narration_dir = repo_root / ".generated" / "narration" / "characters"
    output_dir = repo_root / "public" / "audio" / "characters"

    if not narration_dir.exists():
        print(
            f"ERROR: Narration directory not found: {narration_dir}\n"
            "Run the narration builder first:\n"
            "  npm run tts:build-narration",
            file=sys.stderr,
        )
        sys.exit(1)

    output_dir.mkdir(parents=True, exist_ok=True)

    txt_files = sorted(narration_dir.glob("*.txt"))
    if not txt_files:
        print("No .txt narration files found. Nothing to do.")
        return

    # Lazy-import TTS so errors are clear if the package isn't installed
    try:
        import torch
        from TTS.api import TTS as CoquiTTS
    except ImportError:
        print(
            "ERROR: Coqui TTS is not installed.\n"
            "Set up the Python environment:\n"
            "  python3 -m venv .venv\n"
            "  source .venv/bin/activate   # Windows: .venv\\Scripts\\activate\n"
            "  pip install -r requirements-tts.txt",
            file=sys.stderr,
        )
        sys.exit(1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Loading model '{args.model}' on {device} …")
    tts = CoquiTTS(args.model).to(device)

    generated = 0
    skipped = 0

    for txt_path in txt_files:
        slug = txt_path.stem
        wav_path = output_dir / f"{slug}.wav"

        if not is_stale(txt_path, wav_path, args.force):
            skipped += 1
            continue

        text = txt_path.read_text(encoding="utf-8").strip()
        if not text:
            print(f"  skip (empty) {slug}")
            skipped += 1
            continue

        print(f"  synthesizing {slug} …", end=" ", flush=True)

        kwargs = {}
        if args.speaker:
            kwargs["speaker"] = args.speaker

        tts.tts_to_file(text=text, file_path=str(wav_path), **kwargs)
        print("done")
        generated += 1

    print(f"\nDone. Generated: {generated}, Skipped (up-to-date): {skipped}")
    print(f"Audio files written to: {output_dir.relative_to(repo_root)}")


if __name__ == "__main__":
    main()
