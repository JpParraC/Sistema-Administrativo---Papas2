import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton,
  CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell,
  CModal, CModalHeader, CModalBody, CModalFooter,
  CForm, CFormInput, CFormSelect, CBadge
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const API_PERSONAL = 'http://localhost:4000/api/personal'
const API_CARGOS = 'http://localhost:4000/api/cargos'

const estadosPersonal = ['Activo', 'Inactivo', 'Vacaciones', 'Suspendido']

const Personal = () => {
  const [personal, setPersonal] = useState([])
  const [cargos, setCargos] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

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
      const res = await fetch(API_PERSONAL)
      const data = await res.json()
      setPersonal(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error al cargar personal', error)
      setPersonal([])
    }
  }

  // ======================
  // FETCH CARGOS
  // ======================
  const fetchCargos = async () => {
    try {
      const res = await fetch(API_CARGOS)
      const data = await res.json()

      if (Array.isArray(data)) setCargos(data)
      else if (Array.isArray(data.data)) setCargos(data.data)
      else if (Array.isArray(data.cargos)) setCargos(data.cargos)
      else setCargos([])

    } catch (error) {
      console.error('Error al cargar cargos', error)
      setCargos([])
    }
  }

  useEffect(() => {
    fetchPersonal()
    fetchCargos()
  }, [])

  // ======================
  // INPUT
  // ======================
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // ======================
  // CREATE / UPDATE
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEdit ? `${API_PERSONAL}/${selectedId}` : API_PERSONAL
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Error')

      await fetchPersonal()
      handleClose()
    } catch {
      alert('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // EDIT
  // ======================
  const handleEdit = (p) => {
    setIsEdit(true)
    setSelectedId(p.id)

    setForm({
      ...p,
      tma_fechcon: p.tma_fechcon ? p.tma_fechcon.split('T')[0] : ''
    })

    setVisible(true)
  }

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este empleado?')) return
    await fetch(`${API_PERSONAL}/${id}`, { method: 'DELETE' })
    fetchPersonal()
  }

  const handleClose = () => {
    setVisible(false)
    setIsEdit(false)
    setSelectedId(null)
    setForm({
      tma_nombrep: '',
      tma_cargope: '',
      tma_fechcon: '',
      tma_salario: '',
      tma_telefon: '',
      tma_emailpe: '',
      tma_estadpe: 'Activo'
    })
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Personal</h5>
        <CButton color="primary" onClick={() => setVisible(true)}>
          + Nuevo Empleado
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CTable bordered hover responsive align="middle">
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
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {personal.map((p, i) => (
              <CTableRow key={`personal-${p.id ?? i}`}>
                <CTableDataCell>{i + 1}</CTableDataCell>
                <CTableDataCell>{p.tma_nombrep}</CTableDataCell>
                <CTableDataCell>{p.tma_cargope}</CTableDataCell>
                <CTableDataCell>{p.tma_fechcon?.split('T')[0]}</CTableDataCell>
                <CTableDataCell>${p.tma_salario}</CTableDataCell>
                <CTableDataCell>{p.tma_telefon}</CTableDataCell>
                <CTableDataCell>{p.tma_emailpe}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={p.tma_estadpe === 'Activo' ? 'success' : 'secondary'}>
                    {p.tma_estadpe}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton size="sm" color="warning" variant="outline" className="me-2"
                    onClick={() => handleEdit(p)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" color="danger" variant="outline"
                    onClick={() => handleDelete(p.id)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* MODAL */}
      <CModal visible={visible} onClose={handleClose}>
        <CModalHeader>
          {isEdit ? 'Editar Empleado' : 'Nuevo Empleado'}
        </CModalHeader>

        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CFormInput label="Nombre" name="tma_nombrep" value={form.tma_nombrep} onChange={handleInputChange} required />

            <CFormSelect
              label="Cargo"
              name="tma_cargope"
              value={form.tma_cargope}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un cargo</option>
              {Array.isArray(cargos) && cargos.map((c, i) => (
                <option key={`cargo-${c.id ?? i}`} value={c.nombre_cargo}>
                  {c.nombre_cargo} ({c.nivel}) - ${c.salario_base}
                </option>
              ))}
            </CFormSelect>

            <CFormInput type="date" label="Fecha" name="tma_fechcon" value={form.tma_fechcon} onChange={handleInputChange} required />
            <CFormInput type="number" label="Salario" name="tma_salario" value={form.tma_salario} onChange={handleInputChange} required />
            <CFormInput label="Teléfono" name="tma_telefon" value={form.tma_telefon} onChange={handleInputChange} required />
            <CFormInput type="email" label="Email" name="tma_emailpe" value={form.tma_emailpe} onChange={handleInputChange} required />

            <CFormSelect label="Estado" name="tma_estadpe" value={form.tma_estadpe} onChange={handleInputChange}>
              {estadosPersonal.map(e => (
                <option key={`estado-${e}`} value={e}>{e}</option>
              ))}
            </CFormSelect>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={handleClose}>Cancelar</CButton>
            <CButton color="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Guardar'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Personal
