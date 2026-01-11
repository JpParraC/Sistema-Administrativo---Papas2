// src/views/Login.js
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
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const API_BASE = 'http://localhost:4000/api'

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
    document.body.style.background = `linear-gradient(135deg, #F4F1BB 60%, #36C9C6 100%)`
  }, [])

  const alertSuccess = (title, text) =>
    Swal.fire({ icon: 'success', title, text, timer: 1800, showConfirmButton: false })
  const alertError = (text) => Swal.fire({ icon: 'error', title: 'Error', text })

  // ===== LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    if (!loginUsername || !loginPassword) {
      setLoginError('Por favor, completa todos los campos.')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: loginUsername, // asegúrate que tu backend espera 'usuario' o 'email'
          password: loginPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setLoginError(data.error || 'Usuario o contraseña incorrectos')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      alertSuccess('Bienvenido', `Hola ${data.user.nombre}`)
      window.location.href = '/#/dashboard'
    } catch (err) {
      console.error(err)
      setLoginError('No se pudo conectar al servidor')
    }
  }

  // ===== REGISTRO =====
  const handleRegister = async () => {
    setRegisterError('')
    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError('Por favor, completa todos los campos.')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setRegisterError(data.error || 'No se pudo registrar el usuario')
        return
      }

      alertSuccess('Registro exitoso', 'Usuario creado correctamente')
      setShowRegister(false)
      setLoginUsername(registerEmail)
      setLoginPassword(registerPassword)
    } catch (err) {
      console.error(err)
      setRegisterError('No se pudo conectar al servidor')
    }
  }

  // ===== RECUPERAR CONTRASEÑA (simulada) =====
  const handleForgotPassword = async () => {
    setEmailMessage('')
    if (!forgotPasswordEmail) {
      setEmailMessage('Por favor, ingresa tu correo electrónico.')
      return
    }
    setEmailMessage('Si el correo existe, recibirás instrucciones para restablecer tu contraseña.')
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, #F4F1BB 60%, #36C9C6 100%) url(${fondoLogin}) center center / cover no-repeat`,
      }}
    >
      <CCard
        style={{
          width: '100%',
          maxWidth: 420,
          border: 'none',
          boxShadow: '0 4px 24px 0 #36C9C644',
          borderRadius: 18,
          background: '#fff',
        }}
      >
        <CCardBody>
          <div className="text-center mb-4">
            <CAvatar
              color="success"
              size="xl"
              style={{
                background: '#36C9C6',
                color: '#fff',
                marginBottom: 8,
                boxShadow: '0 2px 8px #36C9C633',
              }}
            >
              <CIcon icon={cilLeaf} height={36} />
            </CAvatar>
            <h2 style={{ color: '#36C9C6', fontWeight: 700, marginBottom: 0 }}>Sistema Papas</h2>
            <div style={{ color: '#ED6A5A', fontWeight: 500, fontSize: 16, fontStyle: 'italic' }}>
              Gestión de producción agrícola
            </div>
          </div>

          {showForgotPassword ? (
            <CForm>
              <h4 className="text-center mb-3" style={{ color: '#36C9C6' }}>Recuperar contraseña</h4>
              <CInputGroup className="mb-3">
                <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                <CFormInput
                  type="email"
                  placeholder="Correo electrónico"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </CInputGroup>
              {emailMessage && <p className="text-info">{emailMessage}</p>}
              <CRow>
                <CCol xs={12} className="mb-2">
                  <CButton color="info" className="w-100" onClick={handleForgotPassword}>
                    Enviar
                  </CButton>
                </CCol>
                <CCol xs={12}>
                  <CButton color="danger" className="w-100" onClick={() => setShowForgotPassword(false)}>
                    Volver
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          ) : showRegister ? (
            <CForm>
              <h4 className="text-center mb-3" style={{ color: '#36C9C6' }}>Registro</h4>
              <CInputGroup className="mb-3">
                <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                <CFormInput
                  placeholder="Usuario"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                <CFormInput
                  placeholder="Correo electrónico"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Contraseña"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </CInputGroup>
              {registerError && <p className="text-danger">{registerError}</p>}
              <CRow>
                <CCol xs={12} className="mb-2">
                  <CButton color="success" className="w-100" onClick={handleRegister}>
                    Registrarse
                  </CButton>
                </CCol>
                <CCol xs={12}>
                  <CButton color="danger" className="w-100" onClick={() => setShowRegister(false)}>
                    Volver
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          ) : (
            <CForm onSubmit={handleLogin}>
              <h4 className="text-center mb-3" style={{ color: '#36C9C6' }}>Iniciar sesión</h4>
              <CInputGroup className="mb-3">
                <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                <CFormInput
                  placeholder="Usuario"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </CInputGroup>
              {loginError && <p className="text-danger">{loginError}</p>}
              <CRow>
                <CCol xs={12} className="mb-2">
                  <CButton color="primary" className="w-100" type="submit">Ingresar</CButton>
                </CCol>
                <CCol xs={12}>
                  <CButton color="link" className="w-100" onClick={() => setShowForgotPassword(true)}>
                    ¿Olvidaste tu contraseña?
                  </CButton>
                </CCol>
                <CCol xs={12}>
                  <CButton color="link" className="w-100" onClick={() => setShowRegister(true)}>
                    Registrarse
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Login
