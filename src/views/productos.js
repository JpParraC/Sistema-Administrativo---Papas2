import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader,
  CModalBody, CModalFooter, CForm, CFormInput, CFormSelect
} from '@coreui/react'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    descripcion: '',
    unidad: '',
    precio: '',
    tipo: ''
  })

  const API_PRODUCTOS = 'http://localhost:4000/api/productos'

  // ===================== FETCH =====================
  const fetchProductos = async () => {
    try {
      const res = await fetch(API_PRODUCTOS)
      const data = await res.json()
      setProductos(Array.isArray(data) ? data : [])
    } catch (err) {
      Swal.fire('Error', 'No se pudieron cargar los productos', 'error')
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  // ===================== FORM =====================
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setForm(producto)
    } else {
      setForm({
        id: null,
        nombre: '',
        descripcion: '',
        unidad: '',
        precio: '',
        tipo: ''
      })
    }
    setVisibleModal(true)
  }

  // ===================== GUARDAR =====================
  const handleSaveProducto = async (e) => {
    e.preventDefault()

    try {
      const method = form.id ? 'PUT' : 'POST'
      const url = form.id ? `${API_PRODUCTOS}/${form.id}` : API_PRODUCTOS

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          unidad: form.unidad,
          precio: parseFloat(form.precio),
          tipo: form.tipo
        })
      })

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `Producto ${form.id ? 'actualizado' : 'creado'} correctamente`,
        timer: 1500,
        showConfirmButton: false
      })

      setVisibleModal(false)
      fetchProductos()

    } catch (err) {
      Swal.fire('Error', 'No se pudo guardar el producto', 'error')
    }
  }

  // ===================== ELIMINAR =====================
  const handleDeleteProducto = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto será eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (!result.isConfirmed) return

    try {
      await fetch(`${API_PRODUCTOS}/${id}`, { method: 'DELETE' })

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Producto eliminado correctamente',
        timer: 1500,
        showConfirmButton: false
      })

      fetchProductos()
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el producto', 'error')
    }
  }

  // ===================== FILTRO =====================
  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  )

  // ===================== RENDER =====================
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h5>Productos</h5>
        <CButton color="primary" onClick={() => handleOpenModal()}>
          + Nuevo Producto
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CFormInput
          className="mb-3"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CTable hover bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Unidad</CTableHeaderCell>
              <CTableHeaderCell>Precio</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredProductos.map((prod, idx) => (
              <CTableRow key={prod.id}>
                <CTableDataCell>{idx + 1}</CTableDataCell>
                <CTableDataCell>{prod.nombre}</CTableDataCell>
                <CTableDataCell>{prod.unidad}</CTableDataCell>
                <CTableDataCell>${prod.precio}</CTableDataCell>
                <CTableDataCell>{prod.tipo}</CTableDataCell>
                <CTableDataCell>
                 <CButton
  size="sm"
  color="info"
  variant="outline"
  className="me-2"
  onClick={() => handleOpenModal(prod)}
  title="Editar"
>
  <CIcon icon={cilPencil} />
</CButton>

<CButton
  size="sm"
  color="danger"
  variant="outline"
  onClick={() => handleDeleteProducto(prod.id)}
  title="Eliminar"
>
  <CIcon icon={cilTrash} />
</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* MODAL */}
      <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <CModalHeader>{form.id ? 'Editar' : 'Nuevo'} Producto</CModalHeader>
        <CForm onSubmit={handleSaveProducto}>
          <CModalBody>
            <CFormInput label="Nombre" name="nombre" value={form.nombre} onChange={handleInputChange} required />
            <CFormInput label="Unidad" name="unidad" value={form.unidad} onChange={handleInputChange} required />
            <CFormInput type="number" label="Precio" name="precio" value={form.precio} onChange={handleInputChange} required />
            <CFormSelect label="Tipo" name="tipo" value={form.tipo} onChange={handleInputChange}>
              <option value="">Seleccione</option>
              <option value="insumo">Insumo</option>
              <option value="cosecha">Cosecha</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleModal(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Productos
