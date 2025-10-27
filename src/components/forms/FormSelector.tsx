'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BRAND_CONFIG } from '@/config/brand.config';

// Form colors - using brand colors
const FORM_COLORS = {
  primary: '#00AAFF',           // Cyan blue from homepage
  primaryDark: '#0088CC',       // Darker cyan for hover/active
  background: '#F2F2F2D1',      // Light gray
  border: '#00AAFF',            // Cyan border
  text: '#000000',              // Black text
  label: '#00AAFF',             // Cyan labels
  placeholder: '#323232',       // Dark gray placeholder
  checked: '#0088CC',           // Darker cyan when selected
};

// Form validation schema - matching template questions
const formSchema = z.object({
  propertyType: z.string().min(1, 'Property type is required'),
  propertyUse: z.string().min(1, 'Property use is required'),
  creditScore: z.string().min(1, 'Credit score is required'),
  purchaseTimeline: z.string().min(1, 'Purchase timeline is required'),
  purchasePrice: z.string().min(1, 'Purchase price range is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  liquidAssets: z.string().min(1, 'Liquid assets is required'),
  bankruptcy: z.string().min(1, 'Bankruptcy question is required'),
  militaryService: z.string().min(1, 'Military service is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  confirmation: z.string().min(1, 'Please confirm your information'),
});

type FormData = z.infer<typeof formSchema>;

interface FormSelectorProps {
  formType: 'buy' | 'refinance';
  onBack: () => void;
}

// Question slides - same order as template
const questions = [
  {
    id: 'propertyType',
    title: 'What type of property are you looking to buy?',
    options: [
      { value: 'existing-single-family', label: 'Existing Single Family Home' },
      { value: 'townhome-condo', label: 'Townhome/Condo' },
      { value: 'lot-land', label: 'Lot/Land' },
      { value: 'multifamily', label: 'Multifamily (2-4 Unit)' },
    ],
  },
  {
    id: 'propertyUse',
    title: 'How will this home be used?',
    options: [
      { value: 'primary-home', label: 'Primary Home' },
      { value: 'second-home', label: 'Second Home' },
      { value: 'investment', label: 'Investment Property' },
      { value: 'vacation-home', label: 'Vacation Home' },
    ],
  },
  {
    id: 'creditScore',
    title: 'What is your current credit score?',
    options: [
      { value: 'less-580', label: 'Less than 580' },
      { value: '580-619', label: '580 to 619' },
      { value: '620-639', label: '620 to 639' },
      { value: '640-659', label: '640 to 659' },
      { value: '660-679', label: '660 to 679' },
      { value: '680-699', label: '680 to 699' },
      { value: '700-719', label: '700 to 719' },
      { value: '720-760', label: '720 to 760' },
      { value: '760+', label: '760 and above' },
    ],
  },
  {
    id: 'purchaseTimeline',
    title: 'Where are you in the home buying process?',
    options: [
      { value: 'signed-purchase', label: 'Signed Purchase Agreement' },
      { value: 'offer-pending', label: 'Offer Pending/Found Property' },
      { value: 'buying-2-6-months', label: 'Buying in 2-6 Months' },
      { value: 'simply-curious', label: 'Simply Curious' },
    ],
  },
  {
    id: 'purchasePrice',
    title: "What is the price range of homes you've been looking for?",
    options: [
      { value: '0-200k', label: '$200,000 or less' },
      { value: '201k-500k', label: '$201,000 to $500,000' },
      { value: '501k-800k', label: '$501,000 to $800,000' },
      { value: '801k-1.1m', label: '$801,000 to $1,100,000' },
      { value: '1.2m+', label: '$1,200,000 or above' },
    ],
  },
  {
    id: 'employmentStatus',
    title: 'What is your employment status?',
    options: [
      { value: 'employed', label: 'Employed' },
      { value: 'self-employed', label: 'Self-Employed' },
      { value: 'retired', label: 'Retired' },
      { value: 'not-employed', label: 'Not Employed' },
    ],
  },
  {
    id: 'monthlyIncome',
    title: 'How much does your household make per month?',
    options: [
      { value: 'less-500', label: 'Less than $500' },
      { value: '500-2499', label: '$500 - $2,499' },
      { value: '2500-3499', label: '$2,500 - $3,499' },
      { value: '3500-3999', label: '$3,500 - $3,999' },
      { value: '4000-4999', label: '$4,000 - $4,999' },
      { value: '5000-5999', label: '$5,000 - $5,999' },
      { value: '6000-6999', label: '$6,000 - $6,999' },
      { value: '7000-9999', label: '$7,000 - $9,999' },
      { value: '10000-14999', label: '$10,000 - $14,999' },
      { value: '15000+', label: '$15,000 or above' },
    ],
  },
  {
    id: 'liquidAssets',
    title: 'How much liquid assets (savings/investments) do you have available?',
    options: [
      { value: '0-4999', label: '$0 to $4,999' },
      { value: '5000-9999', label: '$5,000 to $9,999' },
      { value: '10000-19999', label: '$10,000 to $19,999' },
      { value: '20000+', label: '$20,000 and above' },
    ],
  },
  {
    id: 'bankruptcy',
    title: 'Bankruptcy, short sale, or foreclosure in last 3 years?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    id: 'militaryService',
    title: 'Military service?',
    options: [
      { value: 'no-service', label: 'No military service' },
      { value: 'yes-served', label: 'Yes, I (or my spouse) served' },
    ],
  },
  {
    id: 'zipCode',
    title: 'What is your zip code?',
    options: [],
    isTextInput: true,
  },
  {
    id: 'yourInfo',
    title: 'Your Information',
    options: [],
    isPersonalInfo: true,
    fields: ['firstName', 'lastName'],
  },
  {
    id: 'email',
    title: 'Your Best Email Address',
    options: [],
    isPersonalInfo: true,
    fields: ['email'],
  },
  {
    id: 'phone',
    title: 'Your Best Contact Number',
    options: [],
    isPersonalInfo: true,
    fields: ['phone'],
  },
  {
    id: 'confirmation',
    title: 'Just to confirm, is the information you provided accurate to the best of your knowledge?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
];

export function FormSelector({ formType, onBack }: FormSelectorProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: '',
      propertyUse: '',
      creditScore: '',
      purchaseTimeline: '',
      purchasePrice: '',
      employmentStatus: '',
      monthlyIncome: '',
      liquidAssets: '',
      bankruptcy: '',
      militaryService: '',
      zipCode: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      confirmation: '',
    },
  });

  const currentQuestion = questions[activeStep];
  const isLastQuestion = activeStep === questions.length - 1;

  const handleNext = async () => {
    const isValid = await trigger(currentQuestion.id as keyof FormData);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          formType,
          source: 'Mortgage Connect',
        }),
      });

      if (response.ok) {
        // Redirect to home page on successful submission
        window.location.href = '/';
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your information. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}>
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{
              mb: 3,
              color: FORM_COLORS.primary,
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 500,
              minHeight: '44px',
              '&:active': {
                backgroundColor: 'rgba(0, 170, 255, 0.1)',
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 170, 255, 0.04)',
              },
            }}
          >
            Back to Options
          </Button>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Question Slides */}
            {activeStep < questions.length && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: 'text.primary',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {currentQuestion.title}
                </Typography>
                <Controller
                  name={currentQuestion.id as keyof FormData}
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: currentQuestion.options.length > 3 ? '1fr 1fr' : '1fr',
                          sm: currentQuestion.options.length > 4 ? '1fr 1fr' : '1fr'
                        },
                        gap: { xs: 1.5, sm: 2 },
                        alignItems: 'start',
                        justifyItems: 'center',
                        width: '100%',
                        maxWidth: { xs: '100%', sm: '100%' },
                        px: { xs: 0, sm: 0 },
                      }}
                    >
                      {/* Render options for regular questions */}
                      {!currentQuestion.isTextInput && currentQuestion.options.map((option, index) => {
                        const isLastOdd = index === currentQuestion.options.length - 1 && currentQuestion.options.length % 2 === 1;
                        return (
                        <Box
                          key={option.value}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minWidth: { xs: '100%', sm: '320px' },
                            minHeight: { xs: '48px', sm: '70px' },
                            width: '100%',
                            border: `2px solid ${FORM_COLORS.checked}`,
                            backgroundColor: FORM_COLORS.checked,
                            borderRadius: '8px',
                            padding: { xs: '12px 16px', sm: '18px 24px' },
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            textAlign: 'center',
                            gridColumn: isLastOdd ? '1 / -1' : 'auto',
                            '&:active': {
                              backgroundColor: FORM_COLORS.primary,
                              transform: 'scale(0.98)',
                            },
                            '&:hover': {
                              backgroundColor: FORM_COLORS.primary,
                              boxShadow: `0 4px 12px rgba(0, 170, 255, 0.3)`,
                              transform: 'translateY(-2px)',
                            },
                          }}
                          onClick={() => {
                            field.onChange(option.value);
                            // Auto-advance to next question after selection
                            setTimeout(() => handleNext(), 200);
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: { xs: '14px', sm: '18px' },
                              fontWeight: 600,
                              color: '#fff',
                              cursor: 'pointer',
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                              lineHeight: 1.3,
                            }}
                          >
                            {option.label}
                          </Box>
                        </Box>
                        );
                      })}

                      {/* Render text input for zip code */}
                      {currentQuestion.isTextInput && (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter zip code"
                          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter' && field.value) {
                              handleNext();
                            }
                          }}
                          style={{
                            width: '100%',
                            maxWidth: '400px',
                            minHeight: '48px',
                            padding: '12px 16px',
                            border: `2px solid ${FORM_COLORS.border}`,
                            backgroundColor: FORM_COLORS.background,
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 600,
                            fontFamily: 'inherit',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = FORM_COLORS.checked;
                            e.currentTarget.style.outline = 'none';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = FORM_COLORS.border;
                          }}
                        />
                      )}

                      {errors[currentQuestion.id as keyof FormData] && (
                        <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 1 }}>
                          {errors[currentQuestion.id as keyof FormData]?.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>
            )}

            {/* Personal Info Pages - Your Information, Email, Phone */}
            {activeStep >= 11 && activeStep < 14 && !currentQuestion.isTextInput && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                {/* Your Information - First Name & Last Name */}
                {activeStep === 11 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                      {/* First Name */}
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="First Name"
                            style={{
                              width: '100%',
                              maxWidth: '400px',
                              minHeight: '48px',
                              padding: '12px 16px',
                              border: `2px solid ${FORM_COLORS.border}`,
                              backgroundColor: FORM_COLORS.background,
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: 500,
                              fontFamily: 'inherit',
                              textAlign: 'center',
                              boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.checked;
                              e.currentTarget.style.outline = 'none';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.border;
                            }}
                          />
                        )}
                      />
                      {errors.firstName && (
                        <Typography sx={{ color: '#f44336', fontSize: '0.75rem' }}>
                          {errors.firstName.message}
                        </Typography>
                      )}
                      {/* Last Name */}
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Last Name"
                            style={{
                              width: '100%',
                              maxWidth: '400px',
                              minHeight: '48px',
                              padding: '12px 16px',
                              border: `2px solid ${FORM_COLORS.border}`,
                              backgroundColor: FORM_COLORS.background,
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: 500,
                              fontFamily: 'inherit',
                              textAlign: 'center',
                              boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.checked;
                              e.currentTarget.style.outline = 'none';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.border;
                            }}
                          />
                        )}
                      />
                      {errors.lastName && (
                        <Typography sx={{ color: '#f44336', fontSize: '0.75rem' }}>
                          {errors.lastName.message}
                        </Typography>
                      )}
                    </Box>
                )}

                {/* Email */}
                {activeStep === 12 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            placeholder="Email Address"
                            style={{
                              width: '100%',
                              maxWidth: '400px',
                              minHeight: '48px',
                              padding: '12px 16px',
                              border: `2px solid ${FORM_COLORS.border}`,
                              backgroundColor: FORM_COLORS.background,
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: 500,
                              fontFamily: 'inherit',
                              textAlign: 'center',
                              boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.checked;
                              e.currentTarget.style.outline = 'none';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.border;
                            }}
                          />
                        )}
                      />
                      {errors.email && (
                        <Typography sx={{ color: '#f44336', fontSize: '0.75rem' }}>
                          {errors.email.message}
                        </Typography>
                      )}
                    </Box>
                )}

                {/* Phone */}
                {activeStep === 13 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="tel"
                            placeholder="Phone Number"
                            style={{
                              width: '100%',
                              maxWidth: '400px',
                              minHeight: '48px',
                              padding: '12px 16px',
                              border: `2px solid ${FORM_COLORS.border}`,
                              backgroundColor: FORM_COLORS.background,
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: 500,
                              fontFamily: 'inherit',
                              textAlign: 'center',
                              boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.checked;
                              e.currentTarget.style.outline = 'none';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = FORM_COLORS.border;
                            }}
                          />
                        )}
                      />
                      {errors.phone && (
                        <Typography sx={{ color: '#f44336', fontSize: '0.75rem' }}>
                          {errors.phone.message}
                        </Typography>
                      )}
                    </Box>
                )}
              </Box>
            )}

            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6, pt: 3, position: 'relative', gap: 2 }}>
              {/* Back Arrow */}
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="text"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    backgroundColor: 'transparent',
                    color: FORM_COLORS.primary,
                    padding: { xs: '6px 8px', sm: '8px 12px' },
                    minWidth: { xs: '44px', sm: 'auto' },
                    minHeight: '44px',
                    '&:active': {
                      backgroundColor: 'rgba(0, 170, 255, 0.1)',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      opacity: 0.8,
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: '20px', sm: '28px' },
                    },
                  }}
                />
              )}

              {/* Center: Progress or Submit */}
              <Box sx={{ flex: 1 }} />

              {/* Next/Submit Arrow or Button */}
              {activeStep === 14 && watch('confirmation') ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{
                    backgroundColor: FORM_COLORS.primary,
                    color: 'white',
                    fontSize: { xs: '14px', sm: '16px' },
                    fontWeight: 'bold',
                    padding: { xs: '12px 24px', sm: '15px 30px' },
                    borderRadius: '12px',
                    textTransform: 'none',
                    minHeight: '48px',
                    minWidth: '100px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    '&:active': {
                      backgroundColor: FORM_COLORS.primaryDark,
                      transform: 'scale(0.98)',
                    },
                    '&:hover': {
                      backgroundColor: FORM_COLORS.primaryDark,
                    },
                    '&:disabled': {
                      opacity: 0.7,
                    },
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                </Button>
              ) : activeStep < 14 ? (
                <Button
                  onClick={handleNext}
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: 'transparent',
                    color: FORM_COLORS.primary,
                    padding: { xs: '6px 8px', sm: '8px 12px' },
                    minWidth: { xs: '44px', sm: 'auto' },
                    minHeight: '44px',
                    '&:active': {
                      backgroundColor: 'rgba(0, 170, 255, 0.1)',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      opacity: 0.8,
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: '20px', sm: '28px' },
                    },
                  }}
                />
              ) : null}
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
