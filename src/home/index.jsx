import Header from '@/components/custom/Header'
import Footer from '@/components/custom/Footer'
import { Button } from '@/components/ui/button'
import { FileText, Sparkles, Download, CheckCircle2, ShieldCheck, Zap, BarChart3, Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function Home() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="container relative z-10 px-4 md:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="text-left">
                <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>AI-Powered Resume Builder</span>
                </div>
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                  Build <span className="text-primary">ATS-Friendly</span> <br /> AI Resumes
                </h1>
                <p className="mb-10 text-lg leading-relaxed text-slate-600 md:text-xl">
                  Generate professional resumes optimized for recruiters and ATS systems. Stand out with AI-crafted content and minimal, modern designs.
                </p>
                {isSignedIn && (
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Link to="/dashboard">
                      <Button size="lg" className="h-14 bg-primary px-10 text-lg font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg">
                        Create Resume
                      </Button>
                    </Link>
                  </div>
                )}
                
                <div className="mt-12 flex flex-wrap gap-6">
                  {[
                    { icon: ShieldCheck, text: "ATS Optimized" },
                    { icon: Sparkles, text: "AI Generated" },
                    { icon: FileText, text: "PDF Export" },
                  ].map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <badge.icon className="h-5 w-5 text-primary" />
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="relative z-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
                  <div className="h-[500px] w-full rounded-lg bg-slate-50 p-6">
                    {/* Mock Resume Structure */}
                    <div className="mx-auto h-full max-w-sm border-t-8 border-primary bg-white shadow-sm p-6">
                      <div className="mb-4 h-4 w-24 bg-slate-200" />
                      <div className="mb-2 h-3 w-16 bg-slate-100" />
                      <div className="mb-8 h-2 w-32 bg-slate-50" />
                      
                      <div className="mb-6">
                        <div className="mb-3 h-3 w-20 bg-slate-200" />
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-slate-100" />
                          <div className="h-2 w-full bg-slate-100" />
                          <div className="h-2 w-4/5 bg-slate-100" />
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="mb-3 h-3 w-32 bg-slate-200" />
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <div className="h-2 w-20 bg-slate-100" />
                            <div className="h-2 w-12 bg-slate-50" />
                          </div>
                          <div className="h-2 w-full bg-slate-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="bg-white py-24">
          <div className="container px-4 md:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">ATS Optimized Features</h2>
              <p className="mt-4 text-lg text-slate-600">Everything you need to beat the hiring bots and get the interview.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: CheckCircle2, title: "ATS-Friendly Templates", desc: "Clean, parsable designs tested against major tracking systems." },
                { icon: Sparkles, title: "AI Summary Generator", desc: "Instantly craft professional summaries tailored to your target role." },
                { icon: Download, title: "Instant PDF Export", desc: "Professional, high-quality PDF generation in a single click." }
              ].map((feature, idx) => (
                <div key={idx} className="ats-card p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link to={isSignedIn ? "/dashboard" : "/auth/sign-in"}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 px-8 font-bold shadow-md">
                   Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default Home