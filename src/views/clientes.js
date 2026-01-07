import { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader,
  CModalBody, CModalFooter, CForm, CFormInput, CBadge, CFormFeedback
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPencil, cilTrash, cilCheckCircle } from '@coreui/icons'

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [selectedCliente, setSelectedCliente] = useState(null)

  const [form, setForm] = useState({
    cedula: '',
    nombre_cliente: '',
    direccion: '',
    telefono: '',
    email: ''
  })

  const [errors, setErrors] = useState({})

  const API_URL = 'http://localhost:4000/api/clientes'

  const fetchClientes = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setClientes(data.map(i => ({
      id: i.tma_idclien,
      cedula: i.tma_cedula,
      nombre_cliente: i.tma_nombrec,
      direccion: i.tma_direcci,
      telefono: i.tma_telefon,
      email: i.tma_emailcl
    })))
  }

  useEffect(() => { fetchClientes() }, [])

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🔎 Validaciones
  const validateForm = () => {
    const errs = {}
    if (!form.cedula || !/^\d+$/.test(form.cedula)) errs.cedula = 'La cédula solo debe contener números'
    if (!form.nombre_cliente) errs.nombre_cliente = 'Nombre obligatorio'
    if (!form.direccion) errs.direccion = 'Dirección obligatoria'
    if (!form.telefono || !/^\d+$/.test(form.telefono)) errs.telefono = 'Teléfono inválido'
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Email inválido'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ➕ Crear
  const handleAddCliente = async e => {
    e.preventDefault()
    if (!validateForm()) return
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cedula: form.cedula,
        nombre: form.nombre_cliente,
        direccion: form.direccion,
        telefono: form.telefono,
        email: form.email
      })
    })
    fetchClientes()
    setVisible(false)
    setSuccessMessage('Cliente creado exitosamente')
    setSuccessVisible(true)
  }

  // ✏️ Editar
  const handleEditCliente = cliente => {
    setSelectedCliente(cliente)
    setForm(cliente)
    setEditVisible(true)
  }

  const handleUpdateCliente = async e => {
    e.preventDefault()
    if (!validateForm()) return
    await fetch(`${API_URL}/${selectedCliente.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cedula: form.cedula,
        nombre: form.nombre_cliente,
        direccion: form.direccion,
        telefono: form.telefono,
        email: form.email
      })
    })
    fetchClientes()
    setEditVisible(false)
    setSuccessMessage('Cliente actualizado correctamente')
    setSuccessVisible(true)
  }

  // 🗑️ Eliminar
  const confirmDelete = cliente => {
    setSelectedCliente(cliente)
    setDeleteVisible(true)
  }

  const handleDeleteCliente = async () => {
    await fetch(`${API_URL}/${selectedCliente.id}`, { method: 'DELETE' })
    fetchClientes()
    setDeleteVisible(false)
    setSuccessMessage('Cliente eliminado correctamente')
    setSuccessVisible(true)
  }

  const input = (name, label, type = 'text') => (
    <>
      <CFormInput
        label={label}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleInputChange}
        invalid={!!errors[name]}
      />
      {errors[name] && <CFormFeedback invalid>{errors[name]}</CFormFeedback>}
    </>
  )

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h5>Clientes</h5>
        <CButton onClick={() => { setForm({ cedula:'',nombre_cliente:'',direccion:'',telefono:'',email:'' }); setErrors({}); setVisible(true) }}>
          + Nuevo
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CTable hover bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Cédula</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Dirección</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {clientes.map(c => (
              <CTableRow key={c.id}>
                <CTableDataCell>{c.id}</CTableDataCell>
                <CTableDataCell>{c.cedula}</CTableDataCell>
                <CTableDataCell><CBadge color="info">{c.nombre_cliente}</CBadge></CTableDataCell>
                <CTableDataCell>{c.direccion}</CTableDataCell>
                <CTableDataCell>{c.telefono}</CTableDataCell>
                <CTableDataCell>{c.email}</CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="warning" className="me-2" onClick={() => handleEditCliente(c)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" color="danger" onClick={() => confirmDelete(c)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal Form */}
      {[{v:visible,set:setVisible,t:'Nuevo Cliente',h:handleAddCliente},
        {v:editVisible,set:setEditVisible,t:'Editar Cliente',h:handleUpdateCliente}
      ].map((m,i)=>(
        <CModal key={i} visible={m.v} onClose={()=>m.set(false)}>
          <CModalHeader><strong>{m.t}</strong></CModalHeader>
          <CForm onSubmit={m.h}>
            <CModalBody>
              {input('cedula','Cédula')}
              {input('nombre_cliente','Nombre')}
              {input('direccion','Dirección')}
              {input('telefono','Teléfono')}
              {input('email','Email','email')}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={()=>m.set(false)}>Cancelar</CButton>
              <CButton color="primary" type="submit">Guardar</CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      ))}

      {/* Modal Eliminar */}
      <CModal visible={deleteVisible} onClose={()=>setDeleteVisible(false)}>
        <CModalHeader><strong>Confirmar eliminación</strong></CModalHeader>
        <CModalBody>
          ¿Eliminar al cliente <strong>{selectedCliente?.nombre_cliente}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={()=>setDeleteVisible(false)}>Cancelar</CButton>
          <CButton color="danger" onClick={handleDeleteCliente}>Eliminar</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Éxito */}
      <CModal visible={successVisible} onClose={()=>setSuccessVisible(false)}>
        <CModalBody className="text-center">
          <CIcon icon={cilCheckCircle} size="xxl" className="text-success mb-3" />
          <p>{successMessage}</p>
        </CModalBody>
      </CModal>
    </CCard>
  )
}

export default Clientes
