import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';

const VALID_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, status } = body;

    // Validate input
    if (!leadId || typeof leadId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid lead ID' },
        { status: 400 }
      );
    }

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + VALID_STATUSES.join(', ') },
        { status: 400 }
      );
    }

    // Update the lead status
    const [updatedLead] = await db
      .update(leads)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, leadId))
      .returning();

    if (!updatedLead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: {
        id: updatedLead.id,
        status: updatedLead.status,
      },
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
