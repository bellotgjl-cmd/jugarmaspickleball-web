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
    // 1. Enviar notificación por email al admin (opcional: o puedes quitar esto si el admin mirará Supabase)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email || 'noreply@jugarmaspickleball.es',
        message: data.quote,
        name: data.name,
        level: data.level,
        type: 'testimonial'
      }),
    }).catch(console.error);

    // 2. Guardar en Supabase
    const { error } = await supabase
      .from('testimonials')
      .insert([
        {
          name: data.name,
          email: data.email || '',
          level: data.level,
          quote: data.quote,
          avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(data.name)}`,
          approved: false
        }
      ]);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Error al guardar el testimonio en Supabase:', err);
    return { success: false, error: 'No se pudo enviar el testimonio' };
  }
};

export const getTestimonials = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error obteniendo testimonios:', error);
    return [];
  }
  return data || [];
};

export const updateTestimonialStatus = async (id: string, approved: boolean): Promise<{ success: boolean }> => {
  const { error } = await supabase
    .from('testimonials')
    .update({ approved })
    .match({ id });

  if (error) {
    console.error('Error actualizando testimonio:', error);
    return { success: false };
  }
  return { success: true };
};

export const deleteTestimonial = async (id: string): Promise<{ success: boolean }> => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .match({ id });

  if (error) {
    console.error('Error borrando testimonio:', error);
    return { success: false };
  }
  return { success: true };
};

export const saveAdminReply = async (testimonialId: string, text: string): Promise<{ success: boolean }> => {
  const { error } = await supabase
    .from('testimonials')
    .update({
      admin_reply_text: text,
      admin_reply_name: 'José Luis Bellot',
      admin_reply_date: new Date().toISOString()
    })
    .match({ id: testimonialId });

  if (error) {
    console.error('Error guardando respuesta:', error);
    return { success: false };
  }
  return { success: true };
};

export const getAdminReplies = async (): Promise<Record<string, { text: string; adminName: string; adminAvatar: string; date: string }>> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, admin_reply_text, admin_reply_name, admin_reply_date')
    .not('admin_reply_text', 'is', null);

  if (error) {
    console.error('Error obteniendo respuestas:', error);
    return {};
  }

  const map: Record<string, any> = {};
  data.forEach((item) => {
    map[item.id] = {
      text: item.admin_reply_text,
      adminName: item.admin_reply_name,
      adminAvatar: '/jose-luis-support.webp',
      date: item.admin_reply_date
    };
  });

  return map;
};
