import { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CForm, CFormInput, CBadge, CFormFeedback, CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
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

  // ================= FETCH =================
  const fetchClientes = async () => {
    try {
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
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'No se pudieron cargar los clientes', 'error')
    }
  }

  useEffect(() => { fetchClientes() }, [])

  // ================= FORM =================
  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const errs = {}
    if (!form.cedula || !/^\d+$/.test(form.cedula)) errs.cedula = 'La cédula solo debe contener números'
    if (!form.nombre_cliente) errs.nombre_cliente = 'Nombre obligatorio'
    if (!form.direccion) errs.direccion = 'Dirección obligatoria'
    if (!form.telefono || !/^\d+$/.test(form.telefono)) errs.telefono = 'Teléfono inválido'
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Email inválido'

    if (Object.keys(errs).length > 0) {
      // Mostrar todos los errores en SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        html: Object.values(errs).map(e => `<p>${e}</p>`).join('')
      })
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ================= CREAR =================
  const handleAddCliente = async e => {
    e.preventDefault()
    if (!validateForm()) return

    try {
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
      Swal.fire({ icon: 'success', title: 'Cliente creado', text: 'Cliente creado exitosamente ✅', timer: 1800, showConfirmButton: false })
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'No se pudo crear el cliente', 'error')
    }
  }

  // ================= EDITAR =================
  const handleEditCliente = cliente => {
    setSelectedCliente(cliente)
    setForm(cliente)
    setEditVisible(true)
  }

  const handleUpdateCliente = async e => {
    e.preventDefault()
    if (!validateForm()) return

    try {
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
      Swal.fire({ icon: 'success', title: 'Cliente actualizado', text: 'Cliente actualizado correctamente ✅', timer: 1800, showConfirmButton: false })
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'No se pudo actualizar el cliente', 'error')
    }
  }

  // ================= ELIMINAR =================
  const handleDeleteCliente = async cliente => {
    const result = await Swal.fire({
      title: `¿Eliminar al cliente "${cliente.nombre_cliente}"?`,
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      await fetch(`${API_URL}/${cliente.id}`, { method: 'DELETE' })
      fetchClientes()
      Swal.fire({ icon: 'success', title: 'Cliente eliminado', text: 'Cliente eliminado correctamente 🗑️', timer: 1800, showConfirmButton: false })
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'No se pudo eliminar el cliente', 'error')
    }
  }

  // ================= INPUT =================
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
        <CButton color="primary" onClick={() => { setForm({ cedula:'',nombre_cliente:'',direccion:'',telefono:'',email:'' }); setErrors({}); setVisible(true) }}>
          + Nuevo
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CTable hover bordered responsive>
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
                  <CButton size="sm" color="danger" onClick={() => handleDeleteCliente(c)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal Crear */}
      <CModal visible={visible} onClose={()=>setVisible(false)}>
        <CForm onSubmit={handleAddCliente}>
          <CModalHeader><strong>Nuevo Cliente</strong></CModalHeader>
          <CModalBody>
            {input('cedula','Cédula')}
            {input('nombre_cliente','Nombre')}
            {input('direccion','Dirección')}
            {input('telefono','Teléfono')}
            {input('email','Email','email')}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={()=>setVisible(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal Editar */}
      <CModal visible={editVisible} onClose={()=>setEditVisible(false)}>
        <CForm onSubmit={handleUpdateCliente}>
          <CModalHeader><strong>Editar Cliente</strong></CModalHeader>
          <CModalBody>
            {input('cedula','Cédula')}
            {input('nombre_cliente','Nombre')}
            {input('direccion','Dirección')}
            {input('telefono','Teléfono')}
            {input('email','Email','email')}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={()=>setEditVisible(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Clientes
