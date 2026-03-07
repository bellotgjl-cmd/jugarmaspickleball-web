
import { LeadData } from '../types.ts';

export const saveLead = async (data: Omit<LeadData, 'id' | 'timestamp'>): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const newLead: LeadData = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString()
  };

  const existingLeads = JSON.parse(localStorage.getItem('jmp_leads') || '[]');
  existingLeads.push(newLead);
  localStorage.setItem('jmp_leads', JSON.stringify(existingLeads));

  return { success: true, message: 'Lead capturado con éxito' };
};

export const saveContactMessage = async (data: { email: string; message: string }): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, message: data.message, type: 'contact' }),
    });

    let json;
    try {
      json = await res.json();
    } catch (e) {
      console.error('La respuesta no es un JSON válido:', e);
      return { success: false, error: 'Error interno del servidor (respuesta no JSON)' };
    }

    if (!res.ok) {
      return { success: false, error: json.error || `Error ${res.status}` };
    }

    return { success: json.success };
  } catch (err) {
    console.error('Error enviando mensaje:', err);
    return { success: false, error: 'No se pudo conectar con el servidor' };
  }
};

export const saveTestimonial = async (data: { name: string; level: string; quote: string; email?: string }): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Enviar notificación por email al admin
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email || 'noreply@jugarmaspickleball.es',
        message: data.quote,
        name: data.name,
        level: data.level,
        type: 'testimonial'
      }),
    });

    // 2. Guardar en LocalStorage (temporal para el usuario actual)
    const existing = JSON.parse(localStorage.getItem('jmp_user_testimonials') || '[]');
    existing.push({
      ...data,
      id: Date.now().toString(),
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(data.name)}`,
      date: new Date().toISOString(),
      approved: false
    });
    localStorage.setItem('jmp_user_testimonials', JSON.stringify(existing));

    return { success: true };
  } catch (err) {
    console.error('Error al procesar el testimonio:', err);
    return { success: false, error: 'No se pudo enviar el testimonio' };
  }
};

export const getTestimonials = (): any[] => {
  return JSON.parse(localStorage.getItem('jmp_user_testimonials') || '[]');
};

export const updateTestimonialStatus = async (id: string, approved: boolean): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const existing = JSON.parse(localStorage.getItem('jmp_user_testimonials') || '[]');
  const updated = existing.map((t: any) => t.id === id ? { ...t, approved } : t);
  localStorage.setItem('jmp_user_testimonials', JSON.stringify(updated));
  return { success: true };
};

export const deleteTestimonial = async (id: string): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const existing = JSON.parse(localStorage.getItem('jmp_user_testimonials') || '[]');
  const filtered = existing.filter((t: any) => t.id !== id);
  localStorage.setItem('jmp_user_testimonials', JSON.stringify(filtered));
  return { success: true };
};

export const saveAdminReply = async (testimonialId: string, text: string): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const existingReplies = JSON.parse(localStorage.getItem('jmp_admin_replies') || '{}');
  existingReplies[testimonialId] = {
    text,
    adminName: 'José Luis Bellot',
    adminAvatar: '/jose-luis-support.webp',
    date: new Date().toISOString()
  };
  localStorage.setItem('jmp_admin_replies', JSON.stringify(existingReplies));
  return { success: true };
};

export const getAdminReplies = (): Record<string, { text: string; adminName: string; adminAvatar: string; date: string }> => {
  return JSON.parse(localStorage.getItem('jmp_admin_replies') || '{}');
};
