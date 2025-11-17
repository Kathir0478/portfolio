"use client"

import type React from "react"
import emailjs from "emailjs-com"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { CardHoverWrapper } from "./ui/card-hover-wrapper"
import ScrollFadeInAndOut from "./ui/scroll-fade-in-out"
import ScrollFromLeft from "./ui/scroll-from-left"
import ScrollFromRight from "./ui/scroll-from-right"

export function Contact() {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSending, setIsSending] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isNotify, setNotify] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSending(true)
        setIsSuccess(false)

        try {
            const result = await emailjs.send(
                "service_09a1mur",
                "template_3j31avt",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                "yGcfX1PbfjqRMJdPW"
            )
            console.log("SUCCESS!", result.text)
            setIsSuccess(true)
            setFormData({ name: "", email: "", subject: "", message: "" })
            setNotify(true);
            setTimeout(() => {
                setNotify(false)
            }, 7000)
            toast({
                title: "Message Sent",
                description: "Thanks! I'll get back to you shortly."
            })// reset form
        } catch (error) {
            console.error("FAILED...", error)
            toast({
                variant: "destructive",
                title: "❌ Message Failed",
                description: "Something went wrong. Please try again.",
            })
            // alert("Message failed to send. Please try again.")
        } finally {
            setIsSending(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollFadeInAndOut>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Get In Touch</h2>
                    </ScrollFadeInAndOut>
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <ScrollFromLeft>
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                                <p className="text-lg text-muted-foreground mb-8 text-pretty">
                                    I'm always interested in new opportunities, collaborations, and conversations about technology. Feel
                                    free to reach out if you'd like to connect!
                                </p>
                                <CardHoverWrapper>
                                    <div className="space-y-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                                                <Mail className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Email</h4>
                                                <p className="text-muted-foreground">kathir200420@gmail.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                                                <Phone className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Phone</h4>
                                                <p className="text-muted-foreground">+91 735-877-2583</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                                                <MapPin className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Location</h4>
                                                <p className="text-muted-foreground">Chennai, TamilNadu, India</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardHoverWrapper>
                            </div>
                        </ScrollFromLeft>
                        {/* Contact Form */}
                        <ScrollFromRight>
                            <div>
                                <CardHoverWrapper>
                                    <Card className="py-6">
                                        <CardHeader>
                                            <CardTitle>Send a Message</CardTitle>
                                            <CardDescription>I'll get back to you as soon as possible!</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">Subject</Label>
                                                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Message</Label>
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        rows={5}
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>

                                                <Button type="submit" className="w-full">
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Send Message
                                                </Button>
                                            </form>
                                        </CardContent>
                                        {isNotify &&
                                            <div className="flex justify-center items-center">
                                                <h2 className="text-black dark:text-white">Thanks! I'll get back to you shortly !!!</h2>
                                            </div>
                                        }
                                    </Card>
                                </CardHoverWrapper>
                            </div>
                        </ScrollFromRight>
                    </div>
                </div>
            </div>
        </section>
    )
}
