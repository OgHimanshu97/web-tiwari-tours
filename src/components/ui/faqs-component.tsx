'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What types of vehicles are available in your fleet?',
            answer: 'We offer a wide range of luxury and comfortable vehicles including Innova Crysta, Toyota Fortuner, 12-seater to 26-seater Tempo Travellers, and premium sedans for all your travel needs in Ayodhya and beyond.',
        },
        {
            id: 'item-2',
            question: 'Do you provide specialized tours for Ayodhya Ram Mandir?',
            answer: 'Yes, we specialize in pilgrimage tours to the Ram Mandir and other holy sites in Ayodhya. Our drivers are well-versed with the local routes and darshan timings to ensure a smooth spiritual experience.',
        },
        {
            id: 'item-3',
            question: 'Are your drivers trained for long-distance and night travel?',
            answer: 'Absolutely. All our drivers are highly experienced, professionally trained, and verified. They are comfortable with long-distance outstation trips and late-night airport transfers.',
        },
        {
            id: 'item-4',
            question: 'How do I book a vehicle and what are the payment terms?',
            answer: 'You can book through our website, WhatsApp, or by calling our 24/7 support. We accept all major credit/debit cards, UPI, and bank transfers. A small advance is required to confirm the booking.',
        },
        {
            id: 'item-5',
            question: 'What is your cancellation policy?',
            answer: 'We offer flexible cancellation. If you cancel at least 24 hours before the scheduled pickup, you receive a full refund. For last-minute cancellations, a nominal fee may apply.',
        },
    ]

    return (
        <section className="bg-muted py-16 md:py-24" id="faqs">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div>
                    <h2 className="text-foreground text-4xl font-semibold">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance text-lg">Everything you need to know about booking your luxury journey with Tiwari Tour & Travels.</p>
                </div>

                <div className="mt-12">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-foreground/5 rounded-(--radius) w-full border border-transparent px-8 py-3 shadow ring-1">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dotted">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="#contact"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
