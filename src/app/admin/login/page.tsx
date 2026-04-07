'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SECURITY_ANSWER = 'BCCI2026';

export default function AdminLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaQuestion, setCaptchaQuestion] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const question = `${num1} + ${num2}`;
        const answer = `${num1 + num2}`;
        setCaptchaQuestion(question);
        setCaptchaValue(answer);
        setCaptchaInput('');
    };

    // Generate captcha on component mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate captcha
        if (captchaInput !== captchaValue) {
            setError('Incorrect CAPTCHA. Please try again.');
            generateCaptcha();
            return;
        }

        // Validate security question
        if (securityAnswer.trim() !== SECURITY_ANSWER) {
            setError('Incorrect security answer.');
            return;
        }

        setLoading(true);

        try {
            // Sign in with Supabase Auth
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            if (data.user) {
                // Check if user is admin
                const { data: adminData, error: adminError } = await supabase
                    .from('admin_users')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                if (adminError || !adminData) {
                    await supabase.auth.signOut();
                    throw new Error('Unauthorized access. Only admins can login.');
                }

                // Update last login
                await supabase
                    .from('admin_users')
                    .update({ last_login: new Date().toISOString() })
                    .eq('id', data.user.id);

                // Log activity
                await supabase.from('activity_logs').insert({
                    user_id: data.user.id,
                    action: 'Login',
                    entity_type: 'Admin',
                    details: { email: data.user.email },
                    ip_address: '', // Can be populated from request
                });

                toast({
                    title: 'Login Successful',
                    description: 'Welcome to BCCI Admin Panel',
                });

                router.push('/admin/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
            toast({
                title: 'Login Failed',
                description: err.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4">
            <Card className="w-full max-w-md shadow-2xl border-none">
                <CardHeader className="space-y-4 pb-8">
                    <div className="flex justify-center mb-4">
                        {logoImage && (
                            <Image
                                src={logoImage.imageUrl}
                                alt="BCCI Logo"
                                width={180}
                                height={45}
                                className="h-12 w-auto object-contain"
                            />
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <div className="text-center">
                        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                        <CardDescription className="mt-2">
                            Secure access to BCCI Admin Panel
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="info@bajaurchamber.org.pk"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="rounded-xl"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="rounded-xl"
                            />
                        </div>

                        {/* Security Question */}
                        <div className="space-y-2">
                            <Label htmlFor="security">Security Question</Label>
                            <p className="text-sm text-muted-foreground mb-2">
                                What is the BCCI security code?
                            </p>
                            <Input
                                id="security"
                                type="text"
                                placeholder="Enter security answer"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                required
                                disabled={loading}
                                className="rounded-xl"
                            />
                        </div>

                        {/* CAPTCHA */}
                        <div className="space-y-2">
                            <Label htmlFor="captcha">Verify You're Human</Label>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-100 rounded-xl p-3 border-2 border-gray-200">
                                    <p className="text-center font-mono text-lg font-bold text-gray-700">
                                        {captchaQuestion} = ?
                                    </p>
                                </div>
                                <Input
                                    id="captcha"
                                    type="number"
                                    placeholder="Answer"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-24 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold text-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                'Sign In Securely'
                            )}
                        </Button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs text-blue-800 text-center">
                            <ShieldCheck className="inline h-3 w-3 mr-1" />
                            This is a secure admin area. Unauthorized access is prohibited.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
