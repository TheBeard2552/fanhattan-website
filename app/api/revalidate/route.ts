import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// This route should be called by Sanity webhooks when content is published
export async function POST(request: NextRequest) {
  try {
    // Verify the request is coming from Sanity (optional but recommended)
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    let body: { _type?: string; slug?: { current?: string } } = {};
    try {
      body = await request.json();
    } catch {
      // Empty or invalid body is ok (e.g. manual curl test)
    }
    
    // Get the document type and slug from the webhook payload
    const documentType = body._type;
    const slug = body.slug?.current;

    // Revalidate all lore pages
    revalidatePath('/lore');
    
    // Revalidate type-specific pages
    if (documentType) {
      let type = '';
      switch (documentType) {
        case 'loreCharacter':
          type = 'characters';
          break;
        case 'loreDistrict':
          type = 'districts';
          break;
        case 'loreArtifact':
          type = 'artifacts';
          break;
        case 'loreChapter':
          type = 'chapters';
          break;
      }
      
      if (type) {
        revalidatePath(`/lore/${type}`);
        
        // Revalidate the specific entry page if we have a slug
        if (slug) {
          revalidatePath(`/lore/${type}/${slug}`);
        }
      }
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      paths: ['/lore', documentType ? `/lore/${documentType}` : null, slug ? `/lore/${documentType}/${slug}` : null].filter(Boolean)
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
