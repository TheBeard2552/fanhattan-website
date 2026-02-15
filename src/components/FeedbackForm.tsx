'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function FeedbackForm() {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');
  const [publicId, setPublicId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScreenshotChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Screenshot must be smaller than 5MB');
        setStatus('error');
        return;
      }

      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setMessage('Screenshot must be PNG, JPG, or WebP format');
        setStatus('error');
        return;
      }

      setScreenshot(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!type || !description || status === 'loading') return;

    setStatus('loading');
    setMessage('');

    const formData = new FormData();
    formData.append('type', type);
    formData.append('description', description);
    if (screenshot) formData.append('screenshot', screenshot);
    // Honeypot field (should remain empty)
    formData.append('website', '');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus('success');
        setMessage(data.message || 'Feedback submitted successfully!');
        setPublicId(data.publicId);
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to submit feedback. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success' && publicId) {
    return (
      <div className="border border-border rounded-lg bg-card p-8 shadow-xl">
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-platform/10 mb-4">
              <svg
                className="w-8 h-8 text-platform"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-display uppercase tracking-wide text-platform mb-2">
              Incident Logged
            </h2>
            <p className="text-muted-foreground mb-6">{message}</p>
            <div className="p-4 rounded-md bg-platform/10 border border-platform/20 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Your Incident ID</p>
              <p className="text-3xl font-display uppercase tracking-wide text-platform">
                {publicId}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              A discussion thread has been created in Discord. Join the conversation
              to see what the community thinks!
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setType('');
                setDescription('');
                setScreenshot(null);
                setScreenshotPreview(null);
                setPublicId(null);
                setMessage('');
              }}
              className="w-full py-3 px-4 font-display uppercase tracking-wide text-sm bg-platform text-background rounded-md hover:bg-platform/90 transition-colors"
            >
              Submit Another Report
            </button>
            <Link
              href="/"
              className="block w-full py-3 px-4 text-center font-display uppercase tracking-wide text-sm text-muted-foreground hover:text-platform transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg bg-card p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <div>
          <label htmlFor="type" className="block text-sm font-display uppercase tracking-wide text-foreground mb-2">
            Incident Type *
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-platform focus:border-transparent"
            disabled={status === 'loading'}
          >
            <option value="">Select type...</option>
            <option value="Bug">🐞 Bug - Something isn&apos;t working</option>
            <option value="Feature">💡 Feature - New idea or enhancement</option>
            <option value="UX">🎨 UX - User experience feedback</option>
            <option value="Other">📝 Other - General feedback</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-display uppercase tracking-wide text-foreground mb-2">
            What Happened? *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you experienced, what you expected, or what you'd like to see..."
            required
            rows={6}
            minLength={10}
            maxLength={2000}
            className="w-full px-4 py-3 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-platform focus:border-transparent resize-none"
            disabled={status === 'loading'}
          />
          <p className="mt-1 text-xs text-muted-foreground text-right">
            {description.length} / 2000 characters
          </p>
        </div>

        {/* Screenshot Upload */}
        <div>
          <label className="block text-sm font-display uppercase tracking-wide text-foreground mb-2">
            Screenshot (Optional)
          </label>
          
          {!screenshotPreview ? (
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleScreenshotChange}
                className="hidden"
                disabled={status === 'loading'}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-8 border-2 border-dashed border-border rounded-md hover:border-platform hover:bg-muted/50 transition-colors"
                disabled={status === 'loading'}
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-muted-foreground"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload a screenshot
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, WebP up to 5MB
                  </p>
                </div>
              </button>
            </div>
          ) : (
            <div className="relative">
              <img
                src={screenshotPreview}
                alt="Screenshot preview"
                className="w-full rounded-md border border-border"
              />
              <button
                type="button"
                onClick={removeScreenshot}
                className="absolute top-2 right-2 p-2 rounded-md bg-background/90 border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
                disabled={status === 'loading'}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Honeypot field (hidden from users) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
          }}
        />

        {/* Error Message */}
        {status === 'error' && message && (
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{message}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading' || !type || !description}
          className="w-full py-3 px-4 font-display uppercase tracking-wide text-sm bg-platform text-background rounded-md hover:bg-platform/90 focus:outline-none focus:ring-2 focus:ring-platform focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
