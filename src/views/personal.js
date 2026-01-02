import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton,
  CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell,
  CModal, CModalHeader, CModalBody, CModalFooter,
  CForm, CFormInput, CFormSelect, CBadge
} from '@coreui/react'

const API_URL = 'http://localhost:4000/api/personal'

const estadosPersonal = ['Activo', 'Inactivo', 'Vacaciones', 'Suspendido']

const Personal = () => {

  // ======================
  // STATES
  // ======================
  const [personal, setPersonal] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    tma_nombrep: '',
    tma_cargope: '',
    tma_fechcon: '',
    tma_salario: '',
    tma_telefon: '',
    tma_emailpe: '',
    tma_estadpe: 'Activo'
  })

  // ======================
  // FETCH PERSONAL
  // ======================
  const fetchPersonal = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setPersonal(data)
    } catch (error) {
      console.error('Error al cargar personal:', error)
    }
  }

  useEffect(() => {
    fetchPersonal()
  }, [])

  // ======================
  // INPUT HANDLER
  // ======================
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Error al guardar')

      await fetchPersonal()
      setVisible(false)

      setForm({
        tma_nombrep: '',
        tma_cargope: '',
        tma_fechcon: '',
        tma_salario: '',
        tma_telefon: '',
        tma_emailpe: '',
        tma_estadpe: 'Activo'
      })
    } catch (error) {
      console.error(error)
      alert('Error al guardar el empleado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5>Personal</h5>
        <CButton color="primary" onClick={() => setVisible(true)}>
          + Nuevo Empleado
        </CButton>
      </CCardHeader>

      <CCardBody>
        {/* TABLA */}
        <CTable bordered hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Cargo</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Salario</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {personal.map((p, i) => (
              <CTableRow key={p.id}>
                <CTableDataCell>{i + 1}</CTableDataCell>
                <CTableDataCell>{p.tma_nombrep}</CTableDataCell>
                <CTableDataCell>{p.tma_cargope}</CTableDataCell>
                <CTableDataCell>{p.tma_fechcon}</CTableDataCell>
                <CTableDataCell>${p.tma_salario}</CTableDataCell>
                <CTableDataCell>{p.tma_telefon}</CTableDataCell>
                <CTableDataCell>{p.tma_emailpe}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={p.tma_estadpe === 'Activo' ? 'success' : 'secondary'}>
                    {p.tma_estadpe}
                  </CBadge>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* MODAL */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>Nuevo Empleado</CModalHeader>

        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CFormInput label="Nombre" name="tma_nombrep" value={form.tma_nombrep} onChange={handleInputChange} required />
            <CFormInput label="Cargo" name="tma_cargope" value={form.tma_cargope} onChange={handleInputChange} required />
            <CFormInput type="date" label="Fecha de Contrato" name="tma_fechcon" value={form.tma_fechcon} onChange={handleInputChange} required />
            <CFormInput type="number" label="Salario" name="tma_salario" value={form.tma_salario} onChange={handleInputChange} required />
            <CFormInput label="Teléfono" name="tma_telefon" value={form.tma_telefon} onChange={handleInputChange} required />
            <CFormInput type="email" label="Email" name="tma_emailpe" value={form.tma_emailpe} onChange={handleInputChange} required />

            <CFormSelect label="Estado" name="tma_estadpe" value={form.tma_estadpe} onChange={handleInputChange}>
              {estadosPersonal.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </CFormSelect>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Personal
