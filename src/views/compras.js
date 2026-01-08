// src/views/Compras.js
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CBadge,
} from '@coreui/react'

const estadoColors = {
  Pendiente: 'warning',
  Pagada: 'success',
  Anulada: 'danger',
}

const Compras = () => {
  const [compras, setCompras] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [productos, setProductos] = useState([])
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [visibleDetalle, setVisibleDetalle] = useState(false)
  const [detalleCompra, setDetalleCompra] = useState([])
  const [detalleReal, setDetalleReal] = useState([])
  const [form, setForm] = useState({ proveedor_id: '', estado_compra: 'Pendiente' })
  const [selectedCompra, setSelectedCompra] = useState(null)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [compraToDelete, setCompraToDelete] = useState(null)
  const [totalCompra, setTotalCompra] = useState(0)

  const API_PROVEEDORES = 'http://localhost:4000/api/proveedores'
  const API_COMPRAS = 'http://localhost:4000/api/compras'
  const API_PRODUCTOS = 'http://localhost:4000/api/productos'

  // ================== FETCH DATA ==================
  const fetchProveedores = async () => {
    try {
      const res = await fetch(API_PROVEEDORES)
      const data = await res.json()
      setProveedores(
        data.map((p) => ({ id: p.tma_idprove, nombre: p.tma_nombrep, rif: p.tma_rif }))
      )
    } catch (error) {
      console.error('Error fetch proveedores:', error)
    }
  }

  const fetchProductos = async () => {
    try {
      const res = await fetch(API_PRODUCTOS)
      const data = await res.json()
      const productosFiltrados = data.filter((p) => p.tma_tipo?.toLowerCase() === 'insumo')
      setProductos(
        productosFiltrados.map((p) => ({
          id: p.tma_idprodu,
          nombre: p.tma_nombrep,
          unidad: p.tma_unidade,
          precio: Number(p.tma_preciou),
        }))
      )
    } catch (error) {
      console.error('Error fetch productos:', error)
    }
  }

  const fetchCompras = async () => {
    try {
      const res = await fetch(API_COMPRAS)
      const data = await res.json()
      const comprasArray = Array.isArray(data) ? data : []
      setCompras(
        comprasArray.map((c) => ({
          id: c.tb_idcompra ?? 0,
          proveedor_id: c.tb_idproveed ?? 0,
          fecha_compra: c.tb_fechcomp ?? '',
          total_compra: Number(c.tb_totalcom ?? 0),
          estado_compra: c.tb_estadcom ?? 'Pendiente',
        }))
      )
    } catch (error) {
      console.error('Error fetch compras:', error)
      setCompras([])
    }
  }

  useEffect(() => {
    fetchProveedores()
    fetchProductos()
    fetchCompras()
  }, [])

  useEffect(() => {
    const total = detalleCompra.reduce((acc, item) => acc + Number(item.subtotal || 0), 0)
    setTotalCompra(parseFloat(total.toFixed(2)))
  }, [detalleCompra])

  // ================== FORM HANDLERS ==================
  const handleInputChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleDetalleChange = (idx, field, value) => {
    const updated = detalleCompra.map((item, i) => {
      if (i !== idx) return item
      let updatedItem = { ...item, [field]: value }

      if (field === 'producto_id') {
        const prod = productos.find((p) => p.id === Number(value))
        if (prod) {
          updatedItem.precio_unitario_compra = prod.precio
          updatedItem.unidad = prod.unidad
          updatedItem.nombre = prod.nombre
        } else {
          updatedItem.precio_unitario_compra = 0
          updatedItem.unidad = ''
          updatedItem.nombre = ''
        }
      }

      const cantidad = Number(updatedItem.cantidad) || 0
      const precio = Number(updatedItem.precio_unitario_compra) || 0
      updatedItem.subtotal = parseFloat((cantidad * precio).toFixed(2))

      return updatedItem
    })
    setDetalleCompra(updated)
  }

  const handleAddDetalle = () => {
    setDetalleCompra([
      ...detalleCompra,
      { producto_id: '', nombre: '', cantidad: 1, precio_unitario_compra: 0, unidad: '', subtotal: 0 },
    ])
  }

  const handleRemoveDetalle = (idx) => setDetalleCompra(detalleCompra.filter((_, i) => i !== idx))

  // ================== CREAR COMPRA ==================
  const handleAddCompra = async (e) => {
    e.preventDefault()
    if (detalleCompra.length === 0) return alert('Agrega al menos un producto')

    const now = new Date()
    const fechaHora = now.toISOString().slice(0, 19).replace('T', ' ')

    const payload = {
      idProveedor: Number(form.proveedor_id),
      estado: form.estado_compra,
      tb_detalle: detalleCompra.map((d) => ({
        producto_id: Number(d.producto_id),
        cantidad: Number(d.cantidad),
        precio_unitario_compra: Number(d.precio_unitario_compra),
        subtotal: Number(d.subtotal),
      })),
      tb_totalcom: Number(totalCompra),
      tb_fechcomp: fechaHora,
    }

    try {
      await fetch(API_COMPRAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      await fetchCompras()
      setVisible(false)
      setForm({ proveedor_id: '', estado_compra: 'Pendiente' })
      setDetalleCompra([])
    } catch (error) {
      console.error('Error crear compra:', error)
    }
  }

  // ================== EDITAR COMPRA ==================
  const handleEditCompra = async (compra) => {
    setSelectedCompra(compra)
    setForm({
      proveedor_id: compra.proveedor_id,
      estado_compra: compra.estado_compra,
    })

    try {
      const res = await fetch(`${API_COMPRAS}/${compra.id}/detalle`)
      const data = await res.json()
      const detalleMapeado = data.map((item) => {
        const prod = productos.find((p) => p.id === Number(item.tb_idprodu))
        return {
          producto_id: Number(item.tb_idprodu),
          cantidad: Number(item.tb_cantidad),
          precio_unitario_compra: Number(item.tb_precunic),
          subtotal: Number(item.tb_subtotal),
          unidad: item.unidad || prod?.unidad || '',
          nombre: prod?.nombre || item.nombre_producto || '',
        }
      })
      setDetalleCompra(detalleMapeado)
      setEditVisible(true)
    } catch (error) {
      console.error('Error cargando detalle para editar:', error)
    }
  }

  const handleUpdateCompra = async (e) => {
    e.preventDefault()
    if (!selectedCompra) return

    const payload = {
      idProveedor: Number(form.proveedor_id),
      estado: form.estado_compra,
      tb_detalle: detalleCompra.map((d) => ({
        producto_id: Number(d.producto_id),
        cantidad: Number(d.cantidad),
        precio_unitario_compra: Number(d.precio_unitario_compra),
        subtotal: Number(d.subtotal),
      })),
      tb_totalcom: detalleCompra.reduce((acc, item) => acc + Number(item.subtotal || 0), 0),
    }

    try {
      await fetch(`${API_COMPRAS}/${selectedCompra.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      await fetchCompras()
      setEditVisible(false)
      setSelectedCompra(null)
      setForm({ proveedor_id: '', estado_compra: 'Pendiente' })
      setDetalleCompra([])
    } catch (error) {
      console.error('Error actualizando compra:', error)
    }
  }

  // ================== ELIMINAR COMPRA ==================
  const handleShowDeleteModal = (compra) => {
    setCompraToDelete(compra)
    setDeleteVisible(true)
  }

  const confirmDeleteCompra = async () => {
    if (!compraToDelete) return
    try {
      await fetch(`${API_COMPRAS}/${compraToDelete.id}`, { method: 'DELETE' })
      setCompras(compras.filter((c) => c.id !== compraToDelete.id))
      setDeleteVisible(false)
      setCompraToDelete(null)
    } catch (error) {
      console.error('Error eliminar compra:', error)
    }
  }

  // ================== DETALLE ==================
  const fetchDetalleCompra = async (id) => {
    try {
      const res = await fetch(`${API_COMPRAS}/${id}/detalle`)
      const data = await res.json()
      setDetalleReal(data)
      setVisibleDetalle(true)
    } catch (error) {
      console.error('Error fetch detalle compra:', error)
      setDetalleReal([])
    }
  }

  const getProveedorNombre = (id) => {
    const prov = proveedores.find((p) => p.id === id)
    return prov ? `${prov.nombre} (${prov.rif})` : 'Desconocido'
  }

  const formatFechaHora = (fechaISO) => {
    if (!fechaISO) return ''
    const date = new Date(fechaISO)
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const anio = date.getFullYear()
    const horas = String(date.getHours()).padStart(2, '0')
    const minutos = String(date.getMinutes()).padStart(2, '0')
    const segundos = String(date.getSeconds()).padStart(2, '0')
    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`
  }

  // ================== RENDER ==================
  return (
    <>
      {/* CARD PRINCIPAL */}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Compras</h5>
          <CButton color="primary" onClick={() => setVisible(true)}>
            + Nueva Compra
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable bordered hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Proveedor</CTableHeaderCell>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Total</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {compras.map((compra) => (
                <CTableRow key={compra.id}>
                  <CTableDataCell>{compra.id}</CTableDataCell>
                  <CTableDataCell>{getProveedorNombre(compra.proveedor_id)}</CTableDataCell>
                  <CTableDataCell>{formatFechaHora(compra.fecha_compra)}</CTableDataCell>
                  <CTableDataCell>${compra.total_compra.toFixed(2)}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={estadoColors[compra.estado_compra]}>
                      {compra.estado_compra}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="info" onClick={() => fetchDetalleCompra(compra.id)}>
                      Ver
                    </CButton>{' '}
                    <CButton size="sm" color="warning" onClick={() => handleEditCompra(compra)}>
                      Editar
                    </CButton>{' '}
                    <CButton size="sm" color="danger" onClick={() => handleShowDeleteModal(compra)}>
                      Eliminar
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* --- Eliminar --- */}
      <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)} size="sm">
        <CModalHeader>
          <strong>Confirmar Eliminación</strong>
        </CModalHeader>
        <CModalBody className="text-center">
          <p>
            ¿Estás seguro de eliminar la compra <strong>#{compraToDelete?.id}</strong> del
            proveedor <strong>{getProveedorNombre(compraToDelete?.proveedor_id)}</strong>?
          </p>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          <CButton color="danger" onClick={confirmDeleteCompra}>
            Sí, eliminar
          </CButton>
          <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* --- Nueva Compra --- */}
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <strong>Nueva Compra</strong>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddCompra}>
            <CFormSelect
              label="Proveedor"
              name="proveedor_id"
              value={form.proveedor_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un proveedor</option>
              {proveedores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} ({p.rif})
                </option>
              ))}
            </CFormSelect>

            <h6 className="mt-3">Detalle de Productos</h6>
            {detalleCompra.map((item, idx) => (
              <div key={idx} className="d-flex flex-column flex-md-row gap-2 align-items-end mb-2">
                <CFormSelect
                  value={item.producto_id}
                  onChange={(e) => handleDetalleChange(idx, 'producto_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona un producto</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} - ${p.precio}
                    </option>
                  ))}
                </CFormSelect>

                <CFormInput
                  type="number"
                  placeholder="Cantidad"
                  value={item.cantidad}
                  onChange={(e) => handleDetalleChange(idx, 'cantidad', e.target.value)}
                  min="1"
                  required
                />
                <CFormInput type="text" placeholder="Unidad" value={item.unidad} readOnly />
                <CFormInput
                  type="number"
                  placeholder="Precio Unitario"
                  value={item.precio_unitario_compra}
                  readOnly
                />
                <CFormInput type="number" placeholder="Subtotal" value={item.subtotal} readOnly />

                <CButton type="button" size="sm" color="danger" onClick={() => handleRemoveDetalle(idx)}>
                  Eliminar
                </CButton>
              </div>
            ))}

            <CButton color="secondary" type="button" onClick={handleAddDetalle}>
              + Agregar Producto
            </CButton>

            <h6 className="mt-3">Total: ${totalCompra.toFixed(2)}</h6>

            <CFormSelect
              label="Estado de la Compra"
              name="estado_compra"
              value={form.estado_compra}
              onChange={handleInputChange}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagada">Pagada</option>
              <option value="Anulada">Anulada</option>
            </CFormSelect>

            <CButton color="primary" type="submit" className="mt-3">
              Guardar Compra
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* --- Detalle --- */}
      <CModal visible={visibleDetalle} onClose={() => setVisibleDetalle(false)} size="lg">
        <CModalHeader>
          <strong>Detalle de Compra</strong>
        </CModalHeader>
        <CModalBody>
          <h5 className="text-start mb-3">
            Total: ${detalleReal.reduce((acc, item) => acc + Number(item.tb_subtotal || 0), 0).toFixed(2)}
          </h5>
          <CTable bordered small>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell>Cantidad</CTableHeaderCell>
                <CTableHeaderCell>Precio Unitario</CTableHeaderCell>
                <CTableHeaderCell>Subtotal</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {detalleReal.map((item, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{item.nombre_producto}</CTableDataCell>
                  <CTableDataCell>{item.tb_cantidad}</CTableDataCell>
                  <CTableDataCell>${item.tb_precunic}</CTableDataCell>
                  <CTableDataCell>${item.tb_subtotal}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
      </CModal>

      {/* --- Editar Compra --- */}
      <CModal visible={editVisible} onClose={() => setEditVisible(false)} size="lg">
        <CModalHeader>
          <strong>Editar Compra #{selectedCompra?.id}</strong>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleUpdateCompra}>
            <CFormSelect
              label="Proveedor"
              name="proveedor_id"
              value={form.proveedor_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un proveedor</option>
              {proveedores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} ({p.rif})
                </option>
              ))}
            </CFormSelect>

            <h6 className="mt-3">Detalle de Productos</h6>
            {detalleCompra.map((item, idx) => (
              <div key={idx} className="d-flex flex-column flex-md-row gap-2 align-items-end mb-2">
                <CFormSelect
                  value={item.producto_id}
                  onChange={(e) => handleDetalleChange(idx, 'producto_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona un producto</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} - ${p.precio}
                    </option>
                  ))}
                </CFormSelect>

                <CFormInput
                  type="number"
                  placeholder="Cantidad"
                  value={item.cantidad}
                  onChange={(e) => handleDetalleChange(idx, 'cantidad', e.target.value)}
                  min="1"
                  required
                />
                <CFormInput type="text" placeholder="Unidad" value={item.unidad} readOnly />
                <CFormInput
                  type="number"
                  placeholder="Precio Unitario"
                  value={item.precio_unitario_compra}
                  readOnly
                />
                <CFormInput type="number" placeholder="Subtotal" value={item.subtotal} readOnly />

                <CButton type="button" size="sm" color="danger" onClick={() => handleRemoveDetalle(idx)}>
                  Eliminar
                </CButton>
              </div>
            ))}

            <CButton color="secondary" type="button" onClick={handleAddDetalle}>
              + Agregar Producto
            </CButton>

            <h6 className="mt-3">Total: ${totalCompra.toFixed(2)}</h6>

            <CFormSelect
              label="Estado de la Compra"
              name="estado_compra"
              value={form.estado_compra}
              onChange={handleInputChange}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagada">Pagada</option>
              <option value="Anulada">Anulada</option>
            </CFormSelect>

            <CButton color="primary" type="submit" className="mt-3">
              Guardar Cambios
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditVisible(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Compras
