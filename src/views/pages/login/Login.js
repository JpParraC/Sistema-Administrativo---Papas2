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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'

// 👉 TU LOGO
import logo from 'src/assets/images/log.png'

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
        body: JSON.stringify({
          usuario: loginUsername,
          password: loginPassword,
        }),
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

      setTimeout(() => {
        window.location.href = '/#/dashboard'
      }, 1200)
    } catch {
      setLoginError('Error de conexión')
    }
  }

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
        {/* 👇 MENOS ESPACIO ARRIBA */}
        <CCardBody style={{ padding: '1.2rem 2.5rem 2.5rem' }}>
          {/* 👇 LOGO BIEN ABAJO */}
          <div className="text-center">
            <img
              src={logo}
              alt="AgroControl"
              style={{
                maxWidth: 220,
                width: '150%',
                   // 🔥 ESTO SÍ LO BAJA
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,.35))',
              }}
            />

            <h2
              style={{
                color: '#fff',
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              AgroControl
            </h2>

            <small style={{ color: '#cbd5f5' }}>
              Gestión inteligente de producción
            </small>
          </div>

          <CForm onSubmit={handleLogin} style={{ marginTop: 24 }}>
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
