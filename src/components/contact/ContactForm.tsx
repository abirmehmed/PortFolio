
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  isVisible: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isVisible }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      console.log("Form submitted:", data);
      
      // Show success message
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 5000,
      });
      
      // Reset form
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className={cn(
      "lg:col-span-3 transition-all duration-700",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
    )}>
      <div className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg p-6 md:p-8 shadow-lg h-full">
        <h3 className="text-xl font-semibold mb-6 border-b border-detective-accent/20 pb-3 text-gradient">Send a Message</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="What is this regarding?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell me about your project or inquiry..."
                      className="min-h-[160px] resize-y"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-detective-accent hover:bg-detective-accent/90 text-detective-dark w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
