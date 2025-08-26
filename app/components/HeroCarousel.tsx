"use client";
import { useState } from 'react';
import { Container, Grid, Title, Text, Button, Group, Badge, Stack, Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const heroSlides = [
  {
    id: 1,
    topBadge: "FROM SETBACKS TO SUCCESS",
    mainTitle: "Crack VARC in 45 Days!",
    mentor: {
      name: "Abhishek Anand",
      title: "Lead Mentor",
      percentile: "95+ %ILE",
      image: "/crackcode.png" // Using guy.png from public folder
    },
    countdown: {
      days: 107,
      hours: 12,
      minutes: 19,
      seconds: 37
    },
    description: "Learn with India's top percentilers. Master VARC through elimination-based solving, 95+ percentile mindset training, and personalized error analysis. Get proven strategies, time management shortcuts, and handpicked resources delivered in a focused 45-day program that turns VARC from guesswork into predictable wins.",
    features: [
      "Structured Roadmap",
      "Mentor Support", 
      "Adaptive Mock Analysis"
    ],
    ctaButtons: [
      { text: "Enroll Now", variant: "filled", color: "blue" },
      { text: "Book Free Counseling Call", variant: "filled", color: "grape" }
    ]
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };


  const slide = heroSlides[currentSlide];

  return (
    <Box mt={{ base: 20, sm: 19, md: -64 }} id='#courses'>
      <Container size="xl" py={0}>
      <div style={{ position: 'relative' }}>
  {/* Navigation arrows for multiple slides (desktop only) */}
  {heroSlides.length > 1 && !isMobile && (
          <>
            <Button
              variant="white"
              size="sm"
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                borderRadius: '50%',
                width: 40,
                height: 40,
                padding: 0,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <IconChevronLeft size={18} />
            </Button>

            <Button
              variant="white"
              size="sm"
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                borderRadius: '50%',
                width: 40,
                height: 40,
                padding: 0,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <IconChevronRight size={18} />
            </Button>
          </>
        )}

  <Grid gutter={isMobile ? 20 : 40} align="center">
          {/* Content - left on desktop */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap={10}>
              {/* Top Badge */}
              <div>
                <Text 
                  size="sm" 
                  fw={600} 
                  c="blue.6" 
                  style={{ 
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  {slide.topBadge}
                </Text>
              </div>

              {/* Main Title */}
              <Title 
                order={1}
                style={{
                  fontSize: isMobile ? 'clamp(1.6rem, 5.2vw, 2.4rem)' : 'clamp(2rem, 5vw, 4rem)',
                  lineHeight: 1.1,
                  fontWeight: 800,
                  color: '#1a1a1a'
                }}
              >
                {slide.mainTitle}
              </Title>

              {/* Countdown removed */}

              {/* Description */}
              <Text 
                size={isMobile ? 'md' : 'lg'}
                c="dimmed"
                style={{ 
                  lineHeight: isMobile ? 1.5 : 1.6,
                  fontSize: isMobile ? 'clamp(13px, 2.8vw, 16px)' : 'clamp(16px, 2.5vw, 20px)'
                }}
              >
                {slide.description}
              </Text>

              {/* CTA Buttons */}
              <Group gap={isMobile ? 10 : 15} wrap="wrap">
                {slide.ctaButtons.map((button, index) => {
                  const txt = (button.text || '').toLowerCase();
                  // Book / Counseling button -> scroll to schedule
                  if (txt.includes('book') || txt.includes('counsel')) {
                    return (
                      <Button
                        key={index}
                        variant={button.variant}
                        color={button.color}
                        size={isMobile ? 'sm' : 'lg'}
                        radius="md"
                        onClick={() => {
                          const el = document.getElementById('schedule');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        style={{
                          minWidth: 'fit-content',
                          fontSize: isMobile ? '13px' : '16px',
                          fontWeight: 600
                        }}
                      >
                        {button.text}
                      </Button>
                    );
                  }

                  // Enroll button -> go to payment
                  if (txt.includes('enroll')) {
                    return (
                      <Button
                        key={index}
                        component="a"
                        href="/payment"
                        variant={button.variant}
                        color={button.color}
                        size={isMobile ? 'sm' : 'lg'}
                        radius="md"
                        style={{
                          minWidth: 'fit-content',
                          fontSize: isMobile ? '13px' : '16px',
                          fontWeight: 600
                        }}
                      >
                        {button.text} {index === 0 && '→'}
                      </Button>
                    );
                  }

                  // Fallback
                  return (
                    <Button
                      key={index}
                      variant={button.variant}
                      color={button.color}
                      size={isMobile ? 'sm' : 'lg'}
                      radius="md"
                      style={{
                        minWidth: 'fit-content',
                        fontSize: isMobile ? '13px' : '16px',
                        fontWeight: 600
                      }}
                    >
                      {button.text}
                    </Button>
                  );
                })}
              </Group>

              {/* Features */}
              <Group gap={isMobile ? 18 : 30} wrap="wrap">
                {slide.features.map((feature, index) => (
                  <Group gap={isMobile ? 6 : 8} key={index}>
                    <IconCheck size={isMobile ? 14 : 16} color="#228be6" />
                    <Text size={isMobile ? 's' : 'sm'} fw={500}>
                      {feature}
                    </Text>
                  </Group>
                ))}
              </Group>

              {/* Mentor section below (mobile only) */}
  <Box hiddenFrom="md" mt={{ base: -40, sm: -6 }}>
    <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <img
                      src={slide.mentor.image}
                      alt={slide.mentor.name}
          style={{ height: '420px', width: 'auto', objectFit: 'contain' }}
                    />
                    <Title order={4} size="h4">{slide.mentor.name}</Title>
                    <Group justify="center" gap={8}>
                      <Badge variant="light" color="blue" size="sm">
                        {slide.mentor.percentile}
                      </Badge>
                      <Text size="xs" c="dimmed">{slide.mentor.title}</Text>
                    </Group>
                  </div>
                </div>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Right-side mentor image (desktop only) */}
          <Grid.Col span={5} visibleFrom="md">
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  background: 'none',
                  borderRadius: '16px',
                  padding: '16px',
                  marginTop: -12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={slide.mentor.image}
                  alt={slide.mentor.name}
                  style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
                />
              </div>
              {/* Small overlay with name and percentile */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.75)',
                  padding: '10px 14px',
                  borderRadius: 12,
                  minWidth: 200,
                }}
              >
                <Title order={5} size="h5" c="white" mb={4}>
                  {slide.mentor.name}
                </Title>
                <Group justify="center" gap={8}>
                  <Text size="xs" c="gray.3">
                    {slide.mentor.title}
                  </Text>
                  <Badge variant="light" color="blue" size="xs">
                    {slide.mentor.percentile}
                  </Badge>
                </Group>
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </div>
      </Container>
    </Box>
  );
}
