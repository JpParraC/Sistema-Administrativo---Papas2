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
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
    document.body.style.background = `linear-gradient(135deg, #F4F1BB 60%, #36C9C6 100%)`
  }, [])
  // Simulación de token de sesión


  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    if (!loginUsername || !loginPassword) {
      setLoginError('Por favor, completa todos los campos.')
      return
    }
    // Simulación de autenticación (reemplaza con tu lógica real)
    if (loginUsername.toLocaleLowerCase() == 'admin@gmail.com' && loginPassword === 'admin') {
      // Redirigir o guardar sesión aquí
      // Generar y guardar un token falso en localStorage
      const fakeToken = 'fake-jwt-token-' + Date.now()
      localStorage.setItem('token', fakeToken)
      window.location.href = '/#/dashboard'
    } else {
      setLoginError('Usuario o contraseña incorrectos.')
    }
  }

  const handleRegister = async () => {
    setRegisterError('')
    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError('Por favor, completa todos los campos.')
      return
    }
    // Simulación de registro (reemplaza con tu lógica real)
    if (registerEmail === 'admin@gmail.com') {
      setRegisterError('El correo ya está registrado.')
      return
    }
    // Registro exitoso
    setShowRegister(false)
    setLoginUsername(registerEmail)
    setLoginPassword(registerPassword)
  }

  const handleForgotPassword = async () => {
    setEmailError('')
    if (!forgotPasswordEmail) {
      setEmailError('Por favor, ingresa tu correo electrónico.')
      return
    }
    // Simulación de recuperación (reemplaza con tu lógica real)
    setEmailError('Si el correo existe, recibirás instrucciones para restablecer tu contraseña.')
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
            <h2 style={{ color: '#36C9C6', fontWeight: 700, letterSpacing: 1, marginBottom: 0 }}>
              Sistema Papas
            </h2>
            <div style={{ color: '#ED6A5A', fontWeight: 500, fontSize: 16, fontStyle: 'italic', letterSpacing: 1 }}>
              Gestión de producción agrícola
            </div>
          </div>
          {showForgotPassword ? (
            <CForm>
              <h4 className="text-center mb-3" style={{ color: '#36C9C6' }}>Recuperar contraseña</h4>
              <p className="text-body-secondary text-center mb-3">
                Ingresa tu correo para restablecer tu contraseña.
              </p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="email"
                  placeholder="Correo electrónico"
                  value={forgotPasswordEmail}
                  required
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </CInputGroup>
              {emailError && <p className="text-danger">{emailError}</p>}
              <CRow>
                <CCol xs={12} className="mb-2">
                  <CButton
                    style={{ backgroundColor: '#36C9C6', color: 'white', fontWeight: 600 }}
                    className="px-4 w-100"
                    onClick={handleForgotPassword}
                  >
                    Enviar código
                  </CButton>
                </CCol>
                <CCol xs={12}>
                  <CButton
                    style={{ backgroundColor: '#ED6A5A', color: 'white', fontWeight: 600 }}
                    className="px-4 w-100"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Volver al inicio
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          ) : showRegister ? (
            <CForm>
              <h4 className="text-center mb-3" style={{ color: '#36C9C6' }}>Registro</h4>
              <p className="text-body-secondary text-center mb-3">Crea tu cuenta</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Usuario"
                  autoComplete="username"
                  required
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Correo electrónico"
                  required
                  autoComplete="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  required
                  placeholder="Contraseña"
                  autoComplete="new-password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </CInputGroup>
              {registerError && <p className="text-danger">{registerError}</p>}
              <CRow>
                <CCol xs={12} className="mb-2">
                  <CButton
                    style={{ backgroundColor: '#36C9C6', color: 'white', fontWeight: 600 }}
                    className="px-4 w-100"
                    onClick={handleRegister}
                  >
                    Registrarse
                  </CButton>
                </CCol>
                <CCol xs={12}>
                  <CButton
                    className="px-4 w-100"
                    onClick={() => setShowRegister(false)}
                    style={{ backgroundColor: '#ED6A5A', color: 'white', fontWeight: 600 }}
                  >
                    Volver al inicio
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          ) : (
            <CForm onSubmit={handleLogin}>
              <h4 className="text-center mb-3" style={{ color: '#36C9C6' }}>Iniciar sesión</h4>
              <p className="text-body-secondary text-center mb-3">Accede a tu cuenta</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Correo electrónico"
                  autoComplete="username"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </CInputGroup>
              {loginError && <p className="text-danger">{loginError}</p>}
              <CRow>
                <CCol xs={12} className="mb-2">
                  <CButton
                    style={{ backgroundColor: '#36C9C6', color: 'white', fontWeight: 600 }}
                    className="px-4 w-100"
                    type="submit"
                  >
                    Ingresar
                  </CButton>
                </CCol>
                <CCol xs={12} className="mb-2">
                 
                </CCol>
                <CCol xs={12}>
                  <CButton
                    color="link"
                    className="px-0"
                    style={{ color: '#ED6A5A', fontWeight: 600 }}
                    onClick={() => setShowForgotPassword(true)}
                  >
                    ¿Olvidaste tu contraseña?
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