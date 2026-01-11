import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm,
  CFormInput, CFormSelect
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

  // ===================== FETCH Y NORMALIZACION =====================
  const fetchProductos = async () => {
    try {
      const res = await fetch(API_PRODUCTOS)
      const data = await res.json()

      // Normalizar campos para evitar errores con undefined
      const productosNormalizados = (Array.isArray(data) ? data : []).map(p => ({
        id: p.id,
        nombre: p.nombre || '',
        descripcion: p.descripcion || '',
        unidad: p.unidad || '',
        precio: p.precio || 0,
        tipo: p.tipo || ''
      }))

      setProductos(productosNormalizados)
    } catch (err) {
      console.error('Error obteniendo productos:', err)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  // ===================== FORMULARIO =====================
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setForm({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        unidad: producto.unidad,
        precio: producto.precio,
        tipo: producto.tipo
      })
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

      fetchProductos()
      setVisibleModal(false)
    } catch (err) {
      console.error('Error guardando producto:', err)
    }
  }

  const handleDeleteProducto = async (id) => {
    if (!window.confirm('¿Deseas eliminar este producto?')) return
    try {
      await fetch(`${API_PRODUCTOS}/${id}`, { method: 'DELETE' })
      fetchProductos()
    } catch (err) {
      console.error('Error eliminando producto:', err)
    }
  }

  // ===================== FILTRO =====================
  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(search.toLowerCase()) ||
    p.unidad.toLowerCase().includes(search.toLowerCase()) ||
    p.tipo.toLowerCase().includes(search.toLowerCase())
  )

  // ===================== RENDER =====================
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5>Productos</h5>
        <CButton color="primary" onClick={() => handleOpenModal()}>+ Nuevo Producto</CButton>
      </CCardHeader>

      <CCardBody>
        <CFormInput
          className="mb-3"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CTable hover responsive bordered>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Descripción</CTableHeaderCell>
              <CTableHeaderCell>Unidad</CTableHeaderCell>
              <CTableHeaderCell>Precio</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredProductos.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={8} className="text-center text-muted">
                  No hay productos.
                </CTableDataCell>
              </CTableRow>
            ) : filteredProductos.map((prod, idx) => (
              <CTableRow key={prod.id}>
                <CTableDataCell>{idx + 1}</CTableDataCell>
                <CTableDataCell>{prod.nombre}</CTableDataCell>
                <CTableDataCell>{prod.descripcion}</CTableDataCell>
                <CTableDataCell>{prod.unidad}</CTableDataCell>
                <CTableDataCell>${Number(prod.precio).toFixed(2)}</CTableDataCell>
                <CTableDataCell>{prod.tipo}</CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="info" className="me-2" onClick={() => handleOpenModal(prod)}>Editar</CButton>
                  <CButton size="sm" color="danger" onClick={() => handleDeleteProducto(prod.id)}>Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal */}
      <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <CModalHeader>{form.id ? 'Editar Producto' : 'Nuevo Producto'}</CModalHeader>
        <CForm onSubmit={handleSaveProducto}>
          <CModalBody>
            <CFormInput className="mb-2" label="Nombre" name="nombre" value={form.nombre} onChange={handleInputChange} required />
            <CFormInput className="mb-2" label="Descripción" name="descripcion" value={form.descripcion} onChange={handleInputChange} />
            <CFormInput className="mb-2" label="Unidad" name="unidad" value={form.unidad} onChange={handleInputChange} required />
            <CFormInput className="mb-2" type="number" label="Precio" name="precio" step="0.01" value={form.precio} onChange={handleInputChange} required />
           

            <CFormSelect
              className="mb-2"
              label="Tipo de Producto"
              name="tipo"
              value={form.tipo}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione...</option>
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
