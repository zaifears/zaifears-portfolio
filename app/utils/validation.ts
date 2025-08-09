export const validatePassword = (password: string): string | null => {  
  if (!password.trim()) return 'Password is required'  
  if (password.length < 3) return 'Password too short'  
  return null  
}  
  
export const validateEmail = (email: string): string | null => {  
  if (!email.trim()) return 'Email is required'  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  
  if (!emailRegex.test(email)) return 'Invalid email format'  
  return null  
}  
  
export const sanitizeInput = (input: string): string => {  
  return input.trim().replace(/[<>]/g, '')  
}  