'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { bookingSchema } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function BookingForm() {
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: '', email: '', subject: '', preferredTime: '' },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    // 1. Send email to owner (API call)
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ ...values, type: 'Booking Request' }),
    });

    // 2. Open pre-filled WhatsApp link
    const message = `Hi, I'd like to book a session.\nName: ${values.name}\nSubject: ${values.subject}\nPreferred Time: ${values.preferredTime}`;
    const whatsappUrl = `https://wa.me/923139983408?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="p-6 border rounded-2xl bg-slate-50">
        <h3 className="text-xl font-bold mb-4">Book Your Tutoring Session</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* ... FormField for Name, Email, PreferredTime ... */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Programming">Programming</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" className="w-full">Request Booking</Button>
          </form>
        </Form>
      </div>
      <div className="w-full min-h-[400px] bg-slate-100 rounded-2xl flex items-center justify-center">
        {/* Placeholder for Calendar Embed */}
        <p className="text-slate-500">Calendar (e.g., Calendly) embeds here.</p>
      </div>
    </div>
  );
}