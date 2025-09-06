"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        window.location.href = `mailto:yourname@email.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Hi, I'm ${formData.name} (${formData.email}).\n\n${formData.message}`
        )}`
        console.log("Form submitted:", formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section id="contact" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Get In Touch</h2>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                            <p className="text-lg text-muted-foreground mb-8 text-pretty">
                                I'm always interested in new opportunities, collaborations, and conversations about technology. Feel
                                free to reach out if you'd like to connect!
                            </p>

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

                            {/* Availability */}
                            <Card className="mt-8">
                                <CardHeader>
                                    <CardTitle className="text-lg">Availability</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Currently seeking internship opportunities for Summer 2024 and open to freelance projects during the
                                        academic year.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send a Message</CardTitle>
                                    <CardDescription>I'll get back to you as soon as possible!</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                                            </div>
                                            <div>
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

                                        <div>
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                                        </div>

                                        <div>
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
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
