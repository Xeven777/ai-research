"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Brain,
  Zap,
  Clock,
} from "lucide-react";
import { motion as m } from "motion/react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.3),transparent_40%),radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.3),transparent_40%)]"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10"></div>

        <div className="container px-4 md:px-6 flex flex-col items-center text-center gap-6 pt-8 md:pt-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              AI Document Research
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px]">
              Generate comprehensive research documents instantly with the power
              of AI
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <Link href="/gen">
              <Button
                size="lg"
                className="rounded-full px-8 gap-2 text-lg group"
              >
                Start Generating
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-lg"
            >
              Learn More
            </Button>
          </m.div>

          {/* Preview Image/Animation */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-full max-w-5xl mt-12 rounded-xl overflow-hidden shadow-2xl border border-border/50"
          >
            <div className="aspect-[16/9] bg-card/80 backdrop-blur-sm flex items-center justify-center">
              <div className="w-full max-w-3xl h-full p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1"></div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="h-8 w-3/4 bg-primary/10 rounded-md"></div>
                  <div className="flex gap-4 flex-1">
                    <div className="w-1/3 flex flex-col gap-3">
                      <div className="h-10 bg-primary/10 rounded-md"></div>
                      <div className="h-10 bg-primary/10 rounded-md"></div>
                      <div className="h-10 bg-primary/10 rounded-md"></div>
                      <div className="flex-1"></div>
                    </div>
                    <div className="w-2/3 bg-primary/5 rounded-md p-4 flex flex-col gap-2">
                      <div className="h-6 w-3/4 bg-primary/10 rounded-md"></div>
                      <div className="h-4 w-full bg-primary/10 rounded-md"></div>
                      <div className="h-4 w-full bg-primary/10 rounded-md"></div>
                      <div className="h-4 w-5/6 bg-primary/10 rounded-md"></div>
                      <div className="h-4 w-full bg-primary/10 rounded-md"></div>
                      <div className="h-4 w-4/5 bg-primary/10 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI-powered platform streamlines your research process with
              these amazing features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">AI-Powered Research</CardTitle>
                <CardDescription>
                  Leverage advanced AI to generate comprehensive research
                  documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform uses cutting-edge AI to analyze topics and
                  generate well-structured research papers with proper citations
                  and formatting.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Customizable Outlines</CardTitle>
                <CardDescription>
                  Create and edit document outlines to match your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily customize generated outlines by adding, removing, or
                  rearranging sections and subtopics to perfectly fit your
                  research requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Export Options</CardTitle>
                <CardDescription>
                  Download your research in multiple formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Export your completed research documents in various formats
                  including PDF and DOCX, ready for submission or further
                  editing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate comprehensive research documents in just a few simple
              steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-2xl font-bold text-primary">1</span>
                <div className="absolute w-full h-full rounded-full border-2 border-dashed border-primary/30 animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Topic</h3>
              <p className="text-muted-foreground">
                Provide your research topic and any specific requirements or
                focus areas
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-2xl font-bold text-primary">2</span>
                <div className="absolute w-full h-full rounded-full border-2 border-dashed border-primary/30 animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customize Outline</h3>
              <p className="text-muted-foreground">
                Review and customize the AI-generated outline to match your
                specific needs
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-2xl font-bold text-primary">3</span>
                <div className="absolute w-full h-full rounded-full border-2 border-dashed border-primary/30 animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate & Export</h3>
              <p className="text-muted-foreground">
                Generate content for each section and export your completed
                research document
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ResearchX
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform offers numerous advantages for researchers, students,
              and professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Generate comprehensive research documents in minutes instead
                  of days or weeks
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Always Available</h3>
                <p className="text-muted-foreground">
                  Access our platform 24/7 to generate research content whenever
                  inspiration strikes
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Professional Quality
                </h3>
                <p className="text-muted-foreground">
                  Generate well-structured, properly formatted documents ready
                  for submission
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  AI-Powered Insights
                </h3>
                <p className="text-muted-foreground">
                  Leverage advanced AI to discover connections and insights you
                  might have missed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15),transparent_70%)]"></div>

        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl">
            Ready to Transform Your Research Process?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Join thousands of researchers, students, and professionals who are
            saving time and producing better research documents with our AI
            platform.
          </p>

          <Link href="/gen">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg gap-2 group"
            >
              Start Generating Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
