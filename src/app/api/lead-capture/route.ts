import { NextRequest, NextResponse } from 'next/server';

/**
 * Lead Capture API Endpoint
 * Handles submissions from the LeadCaptureForm component
 * Stores qualified leads for follow-up by the sales team
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, projectType, budget, timeline, referredFrom } = body;

    if (!name || !email || !projectType || !budget || !timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Store lead in database
    // const lead = await createLead({
    //   name,
    //   email,
    //   metadata: {
    //     projectType,
    //     budget,
    //     timeline,
    //     referredFrom,
    //     source: 'lead-capture-form',
    //   },
    // });

    // TODO: Send notification to sales team
    // await resend.emails.send({
    //   from: 'leads@filmdecks.biz',
    //   to: 'sales@filmdecks.biz',
    //   subject: `New Lead: ${name} - ${projectType}`,
    //   html: `
    //     <h2>New Lead Capture</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Project Type:</strong> ${projectType}</p>
    //     <p><strong>Budget:</strong> ${budget}</p>
    //     <p><strong>Timeline:</strong> ${timeline}</p>
    //     ${referredFrom ? `<p><strong>Source:</strong> ${referredFrom}</p>` : ''}
    //   `,
    // });

    // TODO: Send confirmation email to lead
    // await resend.emails.send({
    //   from: 'FilmDecks <hello@filmdecks.biz>',
    //   to: email,
    //   subject: 'We received your project submission',
    //   html: `
    //     <h2>Thanks for your interest!</h2>
    //     <p>Hi ${name},</p>
    //     <p>We've received your project submission and we're excited to learn more about your ${projectType}.</p>
    //     <p>Our team will review your information and reach out within 24-48 hours with personalized feedback.</p>
    //     <p>If you'd like to schedule a call sooner, you can book directly: <a href="https://cal.com/screenwriterhannah/pitch-deck-consultation">Book a Strategy Call</a></p>
    //     <p>Best,<br/>The FilmDecks Team</p>
    //   `,
    // });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
