import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton,
  CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell,
  CModal, CModalHeader, CModalBody, CModalFooter,
  CForm, CFormInput, CFormSelect
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

// ======================
// API
// ======================
const API_CARGOS = 'http://localhost:4000/api/cargos'

// ======================
// NIVELES
// ======================
const nivelesCargo = [
  'Directivo',
  'Administrativo',
  'Profesional',
  'Técnico',
  'Operativo'
]

const Cargos = () => {
  const [cargos, setCargos] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  // modales
  const [successModal, setSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [form, setForm] = useState({
    nombre_cargo: '',
    nivel: '',
    salario_base: ''
  })

  // ======================
  // FETCH
  // ======================
  const fetchCargos = async () => {
    const res = await fetch(API_CARGOS)
    const data = await res.json()
    setCargos(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
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
      const url = isEdit ? `${API_CARGOS}/${selectedId}` : API_CARGOS
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error()

      await fetchCargos()
      handleClose()

      setSuccessMessage(
        isEdit
          ? 'Cargo actualizado correctamente ✅'
          : 'Cargo creado correctamente ✅'
      )
      setSuccessModal(true)

    } catch {
      alert('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // EDIT
  // ======================
  const handleEdit = (cargo) => {
    setIsEdit(true)
    setSelectedId(cargo.id)
    setForm({
      nombre_cargo: cargo.nombre_cargo,
      nivel: cargo.nivel,
      salario_base: cargo.salario_base
    })
    setVisible(true)
  }

  // ======================
  // DELETE
  // ======================
  const handleDeleteConfirm = (id) => {
    setSelectedId(id)
    setConfirmDelete(true)
  }

  const handleDelete = async () => {
    await fetch(`${API_CARGOS}/${selectedId}`, { method: 'DELETE' })
    fetchCargos()
    setConfirmDelete(false)

    setSuccessMessage('Cargo eliminado correctamente 🗑️')
    setSuccessModal(true)
  }

  const handleClose = () => {
    setVisible(false)
    setIsEdit(false)
    setSelectedId(null)
    setForm({
      nombre_cargo: '',
      nivel: '',
      salario_base: ''
    })
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h5>Cargos</h5>
        <CButton color="primary" onClick={() => setVisible(true)}>
          + Nuevo Cargo
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CTable bordered hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Nivel</CTableHeaderCell>
              <CTableHeaderCell>Salario</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {cargos.map((c, i) => (
              <CTableRow key={c.id}>
                <CTableDataCell>{i + 1}</CTableDataCell>
                <CTableDataCell>{c.nombre_cargo}</CTableDataCell>
                <CTableDataCell>{c.nivel}</CTableDataCell>
                <CTableDataCell>${c.salario_base}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton size="sm" color="warning" variant="outline" className="me-2"
                    onClick={() => handleEdit(c)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" color="danger" variant="outline"
                    onClick={() => handleDeleteConfirm(c.id)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* MODAL FORM */}
      <CModal visible={visible} onClose={handleClose}>
        <CModalHeader>{isEdit ? 'Editar Cargo' : 'Nuevo Cargo'}</CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CFormInput label="Nombre" name="nombre_cargo" value={form.nombre_cargo} onChange={handleInputChange} required />
            <CFormSelect label="Nivel" name="nivel" value={form.nivel} onChange={handleInputChange} required>
              <option value="">Seleccione</option>
              {nivelesCargo.map(n => <option key={n}>{n}</option>)}
            </CFormSelect>
            <CFormInput type="number" label="Salario" name="salario_base" value={form.salario_base} onChange={handleInputChange} required />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleClose}>Cancelar</CButton>
            <CButton color="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* MODAL SUCCESS */}
      <CModal visible={successModal} onClose={() => setSuccessModal(false)}>
        <CModalHeader>Éxito</CModalHeader>
        <CModalBody className="text-center">
          {successMessage}
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => setSuccessModal(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL CONFIRM DELETE */}
      <CModal visible={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <CModalHeader>Confirmar eliminación</CModalHeader>
        <CModalBody>
          ¿Está seguro de eliminar este cargo?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setConfirmDelete(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Cargos
