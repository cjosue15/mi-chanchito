import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth/useAuth';
import { LoginFormValues } from '@/infraestructure/interfaces/auth/auth.interface';
import { loginSchema } from '@/infraestructure/interfaces/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginForm = () => {
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);

    const promise = loginMutation.mutateAsync({
      email: data.email,
      password: data.password,
    });

    toast.promise(promise, {
      loading: 'Iniciando sesión...',
      success: () => {
        return 'Sesión iniciada con éxito';
      },
      error: () => {
        return 'Error al iniciar sesión';
      },
      finally: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    {...field}
                    type='email'
                    placeholder='name@example.com'
                    className='pl-10'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='pl-10 pr-10'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-end'>
          <Link
            href='#'
            className='text-sm font-medium text-primary hover:underline'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type='submit' className='w-full' disabled={isLoading}>
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
