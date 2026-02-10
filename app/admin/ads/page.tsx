
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    autoAds: z.string().optional(),
    sidebarAd: z.string().optional(),
    bannerAd: z.string().optional(),
    isEnabled: z.boolean().default(true),
})

export default function AdsSetupPage() {
    const [loading, setLoading] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            autoAds: "",
            sidebarAd: "",
            bannerAd: "",
            isEnabled: true,
        },
    })

    useEffect(() => {
        fetch("/api/ads")
            .then((res) => res.json())
            .then((data) => {
                form.reset({
                    autoAds: data.autoAds || "",
                    sidebarAd: data.sidebarAd || "",
                    bannerAd: data.bannerAd || "",
                    isEnabled: data.isEnabled ?? true,
                })
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                toast.error("Failed to load ad configuration")
                setLoading(false)
            })
    }, [form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/ads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error("Ads Setup Save Error:", response.status, errorText)
                throw new Error(`Failed to save configuration: ${response.status} ${errorText}`)
            }

            toast.success("Ad configuration saved successfully")
        } catch (error) {
            console.error(error)
            toast.error(`Something went wrong: ${error instanceof Error ? error.message : "Unknown error"}`)
        }
    }

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Ads Setup</h1>
                <p className="text-muted-foreground">
                    Configure Google AdSense or other ad network codes here.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Ad Configuration</CardTitle>
                    <CardDescription>
                        Paste your ad unit codes below. Leave empty to disable specific placements.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="isEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Enable Ads Globally</FormLabel>
                                            <FormDescription>
                                                Toggle all ads on or off across the website.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="autoAds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Auto Ads Script (Header)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="<script async src=...></script>"
                                                className="font-mono text-sm min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Code to be injected into the &lt;head&gt; of every page (e.g., AdSense Auto Ads).
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="bannerAd"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Banner Ad Unit (Top/Bottom)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="<ins class='adsbygoogle' ...></ins>"
                                                    className="font-mono text-sm min-h-[150px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Responsive display ad unit code. Used for top and bottom banners.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="sidebarAd"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sidebar Ad Unit</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="<ins class='adsbygoogle' ...></ins>"
                                                    className="font-mono text-sm min-h-[150px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Square or vertical ad unit code (approx 300x250px). Used in sidebars.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Configuration
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
