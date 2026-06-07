'use server';

export async function handleRegister(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // Logika koneksi ke MySQL dan hashing password dilakukan di sini
  console.log('Proses pendaftaran admin:', { username });
}