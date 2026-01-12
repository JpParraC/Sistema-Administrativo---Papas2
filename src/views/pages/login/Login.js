// src/views/pages/login/Login.js
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilLeaf } from '@coreui/icons'
import Swal from 'sweetalert2'
import fondoLogin from 'src/assets/images/fondologin.jpg'

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const API_BASE = 'http://localhost:4000/api'

 useEffect(() => {
  document.body.style.margin = '0'
  document.body.style.height = '100vh'
  document.body.style.background = `
    linear-gradient(135deg, rgba(15,23,42,.75), rgba(15,23,42,.55)),
    url(https://images.unsplash.com/photo-1500382017468-9049fed747ef) center / cover no-repeat
  `
  document.body.style.backgroundAttachment = 'fixed'

  return () => {
    // 🔥 limpiar cuando sales del login
    document.body.style.background = ''
  }
}, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!loginUsername || !loginPassword) {
      setLoginError('Completa todos los campos')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: loginUsername, password: loginPassword }),
      })
      const data = await res.json()

      if (!res.ok) {
        Swal.fire('Error', data.message || 'Credenciales incorrectas', 'error')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: `Hola ${data.user.nombre}`,
        timer: 1500,
        showConfirmButton: false,
      })

      setTimeout(() => (window.location.href = '/#/dashboard'), 1200)
    } catch {
      setLoginError('Error de conexión')
    }
  }
//https://images.unsplash.com/photo-1464226184884-fa280b87c399
  return (
    <div
      style={{
        height: '100vh',
        background: `
          linear-gradient(135deg, rgba(15,23,42,.75), rgba(15,23,42,.55)),
          url(https://images.unsplash.com/photo-1500382017468-9049fed747ef) center / cover
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CCard
        style={{
          width: '100%',
          maxWidth: 420,
          backdropFilter: 'blur(18px)',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 28,
          boxShadow: '0 30px 80px rgba(0,0,0,.35)',
          animation: 'float 6s ease-in-out infinite',
          border: '1px solid rgba(255,255,255,.2)',
        }}
      >
        <CCardBody style={{ padding: '2.5rem' }}>
          <div className="text-center mb-4">
            <CAvatar
              size="xl"
              style={{
                background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
                boxShadow: '0 10px 25px rgba(233, 137, 64, 0.6)',
                marginBottom: 14,
              }}
            >
              <CIcon icon={cilLeaf} height={34} />
            </CAvatar>

            <h2 style={{ color: '#fff', fontWeight: 700 }}>AgroControl</h2>
            <small style={{ color: '#cbd5f5' }}>
              Gestión inteligente de producción
            </small>
          </div>

          <CForm onSubmit={handleLogin}>
            <CInputGroup className="mb-3">
              <CInputGroupText style={iconStyle}>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Usuario"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                style={inputStyle}
              />
            </CInputGroup>

            <CInputGroup className="mb-4">
              <CInputGroupText style={iconStyle}>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Contraseña"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={inputStyle}
              />
            </CInputGroup>

            {loginError && (
              <p className="text-center text-danger small">{loginError}</p>
            )}

            <CButton
              type="submit"
              className="w-100"
              style={{
                borderRadius: 999,
                padding: '0.7rem',
                background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 10px 25px rgba(225, 144, 94, 0.5)',
              }}
            >
              Entrar
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* animación */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  )
}

const inputStyle = {
  borderRadius: 999,
  background: 'rgba(255,255,255,.25)',
  border: 'none',
  color: '#fff',
}

const iconStyle = {
  background: 'transparent',
  border: 'none',
  color: '#e0e7ff',
}

export default Login
