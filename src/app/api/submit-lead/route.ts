import { NextRequest, NextResponse } from 'next/server';
import { BRAND_CONFIG } from '@/config/brand.config';

/**
 * API Route: Submit Lead to GoHighLevel
 * POST /api/submit-lead
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Format data for GHL
    const ghlContact = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      address1: body.propertyAddress || '',
      city: body.city || '',
      state: body.state || '',
      postalCode: body.zipCode || '',
      source: 'Mortgage Connect Website',
      tags: [body.formType === 'buy' ? 'Home Purchase' : 'Refinance'],
      customFields: {
        // Basic Information
        form_type: body.formType,
        applicant_type: body.applicantType || '',

        // Co-Applicant Information (if applicable)
        co_applicant_first_name: body.coApplicantFirstName || '',
        co_applicant_last_name: body.coApplicantLastName || '',
        co_applicant_credit_score: body.coApplicantCreditScore || '',

        // Credit & Financial Info
        credit_score: body.creditScore || 'unknown',
        liquid_assets: body.liquidAssets || '',
        monthly_income: body.monthlyIncome || '',
        bankruptcy_history: body.bankruptcy || '',

        // Employment Information
        employment_status: body.employmentStatus || 'unknown',
        self_employed_years: body.selfEmployedYears || '',
        completed_taxes: body.completedTaxes || '',

        // Property Information
        property_type: body.propertyType || '',
        property_use: body.propertyUse || '',
        purchase_price: body.purchasePrice || '',
        down_payment: body.downPayment || '',

        // Purchase Timeline (for Buy)
        purchase_timeline: body.purchaseTimeline || '',
        open_to_second_opinion: body.openToSecondOpinion || '',
        reason_for_second_opinion: body.reasonForSecondOpinion || '',
        has_real_estate_agent: body.hasRealEstateAgent || '',

        // Refinance Information
        current_loan_status: body.currentLoanStatus || '',
        refinance_reason: body.refinanceReason || '',
        current_home_value: body.currentHomeValue || '',
        monthly_payment: body.monthlyPayment || '',
        years_remaining_on_loan: body.yearsRemainingOnLoan || '',

        // Military & Other Info
        military_service: body.militaryService || '',
        military_status: body.militaryStatus || '',
      },
    };

    // Get GHL API credentials from environment
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID || BRAND_CONFIG.ghl.locationId;

    if (!ghlApiKey) {
      console.error('GHL API Key not configured');
      // For MVP, log the data and return success
      console.log('Lead data (would be sent to GHL):', ghlContact);
      
      return NextResponse.json({
        success: true,
        message: 'Lead received (GHL integration pending)',
        debug: process.env.NODE_ENV === 'development' ? ghlContact : undefined,
      });
    }

    // Submit to GHL API (with error handling)
    let ghlContactId = null;
    let ghlSuccess = false;

    try {
      const ghlResponse = await fetch(
        `https://rest.gohighlevel.com/v1/contacts/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ghlApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...ghlContact,
            locationId: ghlLocationId,
          }),
        }
      );

      if (ghlResponse.ok) {
        const ghlData = await ghlResponse.json();
        ghlContactId = ghlData.contact?.id;
        ghlSuccess = true;

        // Try to create opportunity in GHL (non-blocking)
        if (ghlContactId) {
          try {
            await fetch(
              `https://rest.gohighlevel.com/v1/opportunities/`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${ghlApiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  contactId: ghlContactId,
                  locationId: ghlLocationId,
                  name: `${body.formType === 'buy' ? 'Home Purchase' : 'Refinance'} - ${body.firstName} ${body.lastName}`,
                  pipelineId: process.env.GHL_PIPELINE_ID,
                  pipelineStageId: process.env.GHL_STAGE_ID,
                  status: 'open',
                  monetaryValue: body.purchasePrice ? parseInt(body.purchasePrice.replace(/[^0-9]/g, '')) : 0,
                }),
              }
            );
          } catch (opportunityError) {
            // Opportunity creation failed, but contact was created - that's OK
            console.warn('Failed to create opportunity, but contact was created:', opportunityError);
          }
        }
      } else {
        // GHL API returned error
        const errorData = await ghlResponse.json().catch(() => ({}));
        console.error('GHL API Error:', errorData);
        console.log('Lead data logged for manual review:', ghlContact);
        // Don't throw - let user continue to thank you page
      }
    } catch (ghlError) {
      // GHL connection error - log but don't block user
      console.error('GHL Connection Error:', ghlError);
      console.log('Lead data logged for manual review:', ghlContact);
      // Don't throw - let user continue to thank you page
    }

    // Always return success - user should see thank you page regardless
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      contactId: ghlContactId,
      ghlSubmitted: ghlSuccess,
    });

  } catch (error) {
    console.error('Submit lead error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit lead',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Mortgage Connect Lead API',
    timestamp: new Date().toISOString(),
  });
}
