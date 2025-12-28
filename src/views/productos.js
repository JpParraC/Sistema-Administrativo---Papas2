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
    stock: '',
    tipo: ''          // <<--- NUEVO CAMPO
  })

  const API_PRODUCTOS = 'http://localhost:4000/api/productos'

  const fetchProductos = async () => {
    try {
      const res = await fetch(API_PRODUCTOS)
      const data = await res.json()
      setProductos(data)
    } catch (err) {
      console.error('Error obteniendo productos:', err)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setForm({
        id: producto.tma_idprodu,
        nombre: producto.tma_nombrep,
        descripcion: producto.tma_descrip,
        unidad: producto.tma_unidade,
        precio: producto.tma_preciou,
        stock: producto.tma_stockmi,
        tipo: producto.tma_tipo           // <<--- CAPTURA EL TIPO
      })
    } else {
      setForm({
        id: null, nombre: '', descripcion: '', unidad: '',
        precio: '', stock: '', tipo: ''
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
          stock: parseInt(form.stock),
          tipo: form.tipo                    // <<--- ENVIA EL TIPO
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

  const filteredProductos = productos.filter(p =>
    p.tma_nombrep.toLowerCase().includes(search.toLowerCase()) ||
    p.tma_descrip.toLowerCase().includes(search.toLowerCase()) ||
    p.tma_unidade.toLowerCase().includes(search.toLowerCase()) ||
    (p.tma_tipo || "").toLowerCase().includes(search.toLowerCase())   // <<--- SE AGREGA A FILTRO
  )

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
              <CTableHeaderCell>Stock</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell> {/* NUEVA COLUMNA */}
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredProductos.map((prod, idx) => (
              <CTableRow key={prod.tma_idprodu}>
                <CTableDataCell>{idx + 1}</CTableDataCell>
                <CTableDataCell>{prod.tma_nombrep}</CTableDataCell>
                <CTableDataCell>{prod.tma_descrip}</CTableDataCell>
                <CTableDataCell>{prod.tma_unidade}</CTableDataCell>
                <CTableDataCell>${Number(prod.tma_preciou).toFixed(2)}</CTableDataCell>
                <CTableDataCell>{prod.tma_stockmi}</CTableDataCell>
                <CTableDataCell>{prod.tma_tipo}</CTableDataCell> {/* MOSTRAR TIPO */}
                <CTableDataCell>
                  <CButton size="sm" color="info" className="me-2" onClick={() => handleOpenModal(prod)}>Editar</CButton>
                  <CButton size="sm" color="danger" onClick={() => handleDeleteProducto(prod.tma_idprodu)}>Eliminar</CButton>
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
            <CFormInput className="mb-2" type="number" label="Stock" name="stock" value={form.stock} onChange={handleInputChange} required />

            {/* SELECT DEL TIPO */}
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
