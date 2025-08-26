"use client";
import { useState } from 'react';
import { Card, Stack, TextInput, Select, Button, Group, Text, Badge } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import axios from "axios"

export function ScheduleCall() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
  if (!name.trim()) return 'Name is required';
  
  // ✅ Mobile: exactly 10 digits
  if (!/^\d{10}$/.test(mobile)) return 'Enter a valid 10-digit mobile number';
  
  // ✅ Email: proper format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'Enter your email';
  if (!emailRegex.test(email)) return 'Enter a valid email address';
  
  return null;
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const v = validate(); // returns error string or null
  if (v) {
    setError(v);
    return;
  }

  setError(null);
  setSubmitting(true);

  try {
    const res = await axios.post("/api/demo", {
      name,
      email,
      mobile
    });

    // ✅ Handle success (assuming 200 OK)
    console.log("Success:", res.data);

    
    // ✅ Reset form fields
    setSubmitted(true);
   
  } catch (err: any) {
    console.error("Error submitting:", err);
    
    // ✅ Axios error handling
    if (err.response && err.response.data) {
      setError(err.response.data.message || "Something went wrong!");
    } else {
      setError("Network error. Please try again.");
    }
  } finally {
    setSubmitting(false);
  }
};

  return (
    <Card id="schedule" withBorder radius="lg" shadow="sm" p="xl" style={{maxWidth:980, margin:'0 auto 80px', background:'linear-gradient(135deg,#ffffff 0%,#f4f8ff 100%)'}}>
      <Group align="stretch" gap={40} wrap="wrap" justify="space-between">
        {/* Left rail */}
        <Stack flex={1} gap={22} style={{minWidth:260, maxWidth:360}}>
          <Stack gap={8}>
            <Badge variant="light" color="blue" styles={{root:{background:'#EAF2FF',color:'#0b66ff',fontWeight:600}}}>FREE DEMO CLASS</Badge>
            <Text fw={800} fz={28} style={{letterSpacing:-0.8,lineHeight:1.15}}>
              Try a Live Class.<br />Feel the Difference.
            </Text>
            <Text fz="sm" c="dimmed" style={{lineHeight:1.5}}>
              In 15 minutes, experience our teaching style, clear a couple of doubts, and walk away with a focused 30-day plan.
            </Text>
          </Stack>

          <Stack gap={10}>
            {[
              'Live concept walkthrough (real demo)',
              'Personalized next-30-days mini roadmap',
              'Doubt-solving & exam strategy tips',
              'Zero pressure — join if it fits you'
            ].map(point => (
              <Group key={point} gap={10} align="flex-start">
                <Badge radius="sm" variant="light" styles={{root:{background:'#0b66ff10',color:'#0b66ff',padding:'4px 8px',fontWeight:600}}}>
                  <IconCheck size={14} />
                </Badge>
                <Text fz="sm" c="gray.7" style={{lineHeight:1.4}}>{point}</Text>
              </Group>
            ))}
          </Stack>

          {/* <Group gap={24} mt={8}>
            <Stack gap={2}>
              <Text fw={800} fz={20} c="#0b66ff">98%</Text>
              <Text fz={11} c="dimmed">Found demo valuable</Text>
            </Stack>
            <Stack gap={2}>
              <Text fw={800} fz={20} c="#0b66ff">15m</Text>
              <Text fz={11} c="dimmed">Avg demo length</Text>
            </Stack>
            <Stack gap={2}>
              <Text fw={800} fz={20} c="#0b66ff">3k+</Text>
              <Text fz={11} c="dimmed">Demos delivered</Text>
            </Stack>
          </Group> */}

          <Text fz={11} c="dimmed" style={{maxWidth:300}}>
            No spam. No pushy sales. Just a real class experience and your next steps.
          </Text>
        </Stack>

        {/* Form column */}
        <form onSubmit={handleSubmit} style={{flex:1, minWidth:300}}>
          <Stack gap={18}>
            <Stack gap={4}>
              <Group gap={10}>
                <Text fw={800} fz={22} style={{letterSpacing:-0.5}}>Book Your Demo Class</Text>
                {submitted && <Badge color="blue" variant="light">Booked</Badge>}
              </Group>
              <Text fz="sm" c="dimmed">Slots for this week are limited. Reserve yours now.</Text>
            </Stack>

            <Group grow align="flex-start">
              <TextInput label="Name" placeholder="Your full name" value={name} onChange={(e)=>setName(e.currentTarget.value)} required radius="md" size="md" />
              <TextInput label="Mobile" placeholder="10 digit number" value={mobile} onChange={(e)=>setMobile(e.currentTarget.value.replace(/[^0-9]/g,''))} maxLength={10} required radius="md" size="md" />
            </Group>

            <TextInput label="Email" placeholder="Your Email" value={email} onChange={(e)=> {setEmail(e.currentTarget.value)}} required radius="md" size="md" />

            {error && <Text fz={12} c="red">{error}</Text>}

            {!submitted && (
              <Button type="submit" size="md" radius="md" loading={submitting} rightSection={<IconArrowRight size={18} />} styles={{root:{background:'linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)',fontWeight:600}}}>
                {submitting ? 'Booking...' : 'Book Demo Class'}
              </Button>
            )}

            {submitted && (
              <Card radius="md" p="md" withBorder style={{background:'rgba(0,102,255,0.06)', borderColor:'rgba(0,102,255,0.25)'}}>
                <Text fz="sm" fw={500} c="blue">
                  Thanks {name.split(' ')[0] || 'there'}! Your demo class is booked. We'll reach out shortly .
                </Text>
                {/* <Button mt={12} variant="subtle" size="xs" onClick={()=>{
                  setSubmitted(false); setName(''); setMobile(''); setEmail('');
                }}>
                  Book another demo
                </Button> */}
              </Card>
            )}
          </Stack>
        </form>
      </Group>
    </Card>
  );
}

export default ScheduleCall;
