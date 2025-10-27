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

// Form validation schema for refinance
const refinanceSchema = z.object({
  currentLoanStatus: z.string().min(1, 'Loan status is required'),
  refinanceReason: z.string().min(1, 'Refinance reason is required'),
  creditScore: z.string().min(1, 'Credit score is required'),
  currentHomeValue: z.string().min(1, 'Home value is required'),
  monthlyPayment: z.string().min(1, 'Monthly payment is required'),
  yearsRemainingOnLoan: z.string().min(1, 'Years remaining is required'),
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

type RefinanceFormData = z.infer<typeof refinanceSchema>;

interface RefinanceFormProps {
  onBack: () => void;
}

// Refinance questions - specific to refinancing
const refinanceQuestions = [
  {
    id: 'currentLoanStatus',
    title: 'What is your current loan status?',
    options: [
      { value: 'current-on-payments', label: 'Current on Payments' },
      { value: 'behind-on-payments', label: 'Behind on Payments' },
      { value: 'about-to-default', label: 'About to Default' },
    ],
  },
  {
    id: 'refinanceReason',
    title: 'What is your main reason for refinancing?',
    options: [
      { value: 'lower-rate', label: 'Lower Interest Rate' },
      { value: 'lower-payment', label: 'Lower Monthly Payment' },
      { value: 'cash-out', label: 'Cash Out' },
      { value: 'shorten-term', label: 'Shorten Loan Term' },
      { value: 'change-loan-type', label: 'Change Loan Type' },
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
    id: 'currentHomeValue',
    title: 'What is the current value of your home?',
    options: [
      { value: '0-200k', label: '$200,000 or less' },
      { value: '201k-500k', label: '$201,000 to $500,000' },
      { value: '501k-800k', label: '$501,000 to $800,000' },
      { value: '801k-1.1m', label: '$801,000 to $1,100,000' },
      { value: '1.2m+', label: '$1,200,000 or above' },
    ],
  },
  {
    id: 'monthlyPayment',
    title: 'What is your current monthly mortgage payment?',
    options: [
      { value: 'less-1000', label: 'Less than $1,000' },
      { value: '1000-2000', label: '$1,000 - $2,000' },
      { value: '2000-3000', label: '$2,000 - $3,000' },
      { value: '3000-4000', label: '$3,000 - $4,000' },
      { value: '4000+', label: '$4,000 or more' },
    ],
  },
  {
    id: 'yearsRemainingOnLoan',
    title: 'How many years remain on your current loan?',
    options: [
      { value: 'less-5', label: 'Less than 5 years' },
      { value: '5-10', label: '5 - 10 years' },
      { value: '10-15', label: '10 - 15 years' },
      { value: '15-20', label: '15 - 20 years' },
      { value: '20-25', label: '20 - 25 years' },
      { value: '25+', label: '25+ years' },
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

export function RefinanceForm({ onBack }: RefinanceFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<RefinanceFormData>({
    resolver: zodResolver(refinanceSchema),
    defaultValues: {
      currentLoanStatus: '',
      refinanceReason: '',
      creditScore: '',
      currentHomeValue: '',
      monthlyPayment: '',
      yearsRemainingOnLoan: '',
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

  const currentQuestion = refinanceQuestions[activeStep];

  const handleNext = async () => {
    const isValid = await trigger(currentQuestion.id as keyof RefinanceFormData);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: RefinanceFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          formType: 'refinance',
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
              fontSize: '1rem',
              fontWeight: 500,
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
            {activeStep < refinanceQuestions.length && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: 'text.primary',
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                    textAlign: 'center',
                  }}
                >
                  {currentQuestion.title}
                </Typography>
                <Controller
                  name={currentQuestion.id as keyof RefinanceFormData}
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: currentQuestion.options.length > 4 ? '1fr 1fr' : '1fr',
                        gap: 2,
                        alignItems: 'start',
                        justifyItems: 'center',
                      }}
                    >
                      {!currentQuestion.isTextInput && currentQuestion.options.map((option, index) => {
                        const isLastOdd = index === currentQuestion.options.length - 1 && currentQuestion.options.length % 2 === 1;
                        return (
                        <Box
                          key={option.value}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minWidth: '320px',
                            height: '70px',
                            border: `2px solid ${FORM_COLORS.checked}`,
                            backgroundColor: FORM_COLORS.checked,
                            borderRadius: '8px',
                            padding: '18px 24px',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            textAlign: 'center',
                            gridColumn: isLastOdd ? '1 / -1' : 'auto',
                            '&:hover': {
                              backgroundColor: FORM_COLORS.primary,
                              boxShadow: `0 4px 12px rgba(0, 170, 255, 0.3)`,
                              transform: 'translateY(-2px)',
                            },
                          }}
                          onClick={() => {
                            field.onChange(option.value);
                            setTimeout(() => handleNext(), 200);
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: '18px',
                              fontWeight: 600,
                              color: '#fff',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {option.label}
                          </Box>
                        </Box>
                        );
                      })}

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
                            width: '320px',
                            height: '70px',
                            padding: '18px 24px',
                            border: `2px solid ${FORM_COLORS.border}`,
                            backgroundColor: FORM_COLORS.background,
                            borderRadius: '8px',
                            fontSize: '18px',
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

                      {errors[currentQuestion.id as keyof RefinanceFormData] && (
                        <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 1 }}>
                          {errors[currentQuestion.id as keyof RefinanceFormData]?.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>
            )}

            {/* Personal Info Pages */}
            {activeStep >= 11 && activeStep < 14 && !currentQuestion.isTextInput && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                {activeStep === 11 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 4,
                        color: 'text.primary',
                        fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                        textAlign: 'center',
                      }}
                    >
                      Your Information
                    </Typography>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="First Name"
                          style={{
                            width: '320px',
                            height: '70px',
                            padding: '18px 24px',
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
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Last Name"
                          style={{
                            width: '320px',
                            height: '70px',
                            padding: '18px 24px',
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

                {activeStep === 12 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 4,
                        color: 'text.primary',
                        fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                        textAlign: 'center',
                      }}
                    >
                      Your Best Email Address
                    </Typography>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          placeholder="Email Address"
                          style={{
                            width: '320px',
                            height: '70px',
                            padding: '18px 24px',
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

                {activeStep === 13 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 4,
                        color: 'text.primary',
                        fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                        textAlign: 'center',
                      }}
                    >
                      Your Best Contact Number
                    </Typography>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="tel"
                          placeholder="Phone Number"
                          style={{
                            width: '320px',
                            height: '70px',
                            padding: '18px 24px',
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6, pt: 3, position: 'relative' }}>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="text"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    backgroundColor: 'transparent',
                    color: FORM_COLORS.primary,
                    padding: '8px 12px',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      opacity: 0.8,
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '28px',
                    },
                  }}
                />
              )}

              <Box sx={{ flex: 1 }} />

              {activeStep === 14 && watch('confirmation') ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{
                    backgroundColor: FORM_COLORS.primary,
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '15px 30px',
                    borderRadius: '12px',
                    textTransform: 'none',
                    width: '90%',
                    maxWidth: '150px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
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
                    padding: '8px 12px',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      opacity: 0.8,
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '28px',
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
