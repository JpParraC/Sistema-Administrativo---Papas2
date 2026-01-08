import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader,
  CModalBody, CModalFooter, CForm, CFormInput, CFormSelect, CBadge
} from '@coreui/react'

const API_URL = 'http://localhost:4000/api'

const estadoColors = {
  Pendiente: 'warning',
  Pagada: 'success',
  Cancelada: 'danger'
}

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const [productos, setProductos] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [idVentaEditando, setIdVentaEditando] = useState(null)

  const [visibleVenta, setVisibleVenta] = useState(false)
  const [visibleDetalle, setVisibleDetalle] = useState(false)
  const [visibleCedula, setVisibleCedula] = useState(false)
  const [visibleNuevoCliente, setVisibleNuevoCliente] = useState(false)
  const [visibleMsg, setVisibleMsg] = useState(false)
  const [msgContent, setMsgContent] = useState({ title: '', text: '', color: 'info' })

  const [detalleSeleccionado, setDetalleSeleccionado] = useState([])
  const [detalleVenta, setDetalleVenta] = useState([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  const [estadoVenta, setEstadoVenta] = useState('Pendiente')
  const [cedulaInput, setCedulaInput] = useState('')
  const [nuevoClienteForm, setNuevoClienteForm] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    cedula: ''
  })

  /* ======================
     CARGA INICIAL
  ====================== */
  useEffect(() => {
    fetchVentas()
    fetchProductos()
  }, [])

  const fetchVentas = async () => {
    try {
      const res = await fetch(`${API_URL}/ventas`)
      const data = await res.json()
      setVentas(
        data.map(v => ({
          id: v.tb_idventa,
          cliente: v.cliente,
          fecha: v.tb_fechvent,
          total: Number(v.tb_totalven),
          estado: v.tb_estadven
        }))
      )
    } catch (err) {
      showMessage('Error', 'No se pudieron cargar las ventas', 'danger')
    }
  }

  const fetchProductos = async () => {
    try {
      const res = await fetch(`${API_URL}/productos/cosecha`)
      const data = await res.json()
      setProductos(
        data.map(p => ({
          id: p.id,
          nombre: p.nombre,
          precio: Number(p.precio)
        }))
      )
    } catch (err) {
      showMessage('Error', 'No se pudieron cargar los productos', 'danger')
    }
  }

  /* ======================
     EDITAR VENTA
  ====================== */
  const editarVenta = async (idVenta) => {
    try {
      const res = await fetch(`${API_URL}/ventas/${idVenta}`)
      if (!res.ok) throw new Error()
      const data = await res.json()

      setModoEdicion(true)
      setIdVentaEditando(idVenta)

      setClienteSeleccionado({
        tma_idclien: data.tb_idclien,
        tma_nombrec: data.cliente
      })

      setDetalleVenta(
        data.detalles.map(d => ({
          producto_id: d.tb_idprodu,
          cantidad: Number(d.tb_cantida),
          precio_unitario: Number(d.tb_precuni),
          subtotal: Number(d.tb_subtota)
        }))
      )

      setEstadoVenta(data.tb_estadven)
      setVisibleVenta(true)
    } catch (err) {
      showMessage('Error', 'No se pudo cargar la venta para editar', 'danger')
    }
  }

  /* ======================
     VER DETALLE VENTA
  ====================== */
  const verDetalleVenta = async (idVenta) => {
    try {
      const res = await fetch(`${API_URL}/ventas/${idVenta}`)
      const data = await res.json()
      setDetalleSeleccionado(data.detalles || [])
      setVisibleDetalle(true)
    } catch (err) {
      showMessage('Error', 'No se pudo cargar el detalle de la venta', 'danger')
    }
  }

  /* ======================
     MANEJO DETALLE VENTA
  ====================== */
  const handleAddDetalle = () => {
    setDetalleVenta([
      ...detalleVenta,
      { producto_id: '', cantidad: 1, precio_unitario: 0, subtotal: 0 }
    ])
  }

  const handleDetalleChange = (idx, field, value) => {
    const updated = [...detalleVenta]
    let item = { ...updated[idx], [field]: value }

    if (field === 'producto_id') {
      const prod = productos.find(p => p.id === Number(value))
      if (prod) item.precio_unitario = prod.precio
    }

    item.subtotal = (Number(item.cantidad) || 0) * (Number(item.precio_unitario) || 0)
    updated[idx] = item
    setDetalleVenta(updated)
  }

  const handleRemoveDetalle = (idx) => {
    setDetalleVenta(detalleVenta.filter((_, i) => i !== idx))
  }

  const calcularTotal = () =>
    detalleVenta.reduce((acc, item) => acc + Number(item.subtotal || 0), 0)

  /* ======================
     CREAR / ACTUALIZAR VENTA
  ====================== */
  const handleAddVenta = async (e) => {
    e.preventDefault()

    if (!clienteSeleccionado)
      return showMessage('Aviso', 'Seleccione un cliente', 'warning')

    if (!detalleVenta.length)
      return showMessage('Aviso', 'Agregue al menos un producto', 'warning')

    const payload = {
      idCliente: clienteSeleccionado.tma_idclien,
      estado: estadoVenta,
      detalles: detalleVenta.map(d => ({
        idProducto: Number(d.producto_id) || 0,
        cantidad: Number(d.cantidad) || 0,
        precio: Number(d.precio_unitario) || 0
      }))
    }


    try {
      const url = modoEdicion
        ? `${API_URL}/ventas/${idVentaEditando}`
        : `${API_URL}/ventas`

      const method = modoEdicion ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error()

      setVisibleVenta(false)
      setDetalleVenta([])
      setClienteSeleccionado(null)
      setEstadoVenta('Pendiente')
      setModoEdicion(false)
      setIdVentaEditando(null)

      fetchVentas()

      showMessage(
        'Éxito',
        modoEdicion ? 'Venta actualizada correctamente' : 'Venta creada correctamente',
        'success'
      )
    } catch (err) {
      showMessage('Error', 'No se pudo guardar la venta', 'danger')
    }
  }

  /* ======================
     CLIENTE POR CEDULA
  ====================== */
  const buscarCliente = async () => {
    try {
      const res = await fetch(`${API_URL}/clientes/cedula/${cedulaInput}`)
      if (res.status === 404) {
        setNuevoClienteForm({ ...nuevoClienteForm, cedula: cedulaInput })
        setVisibleNuevoCliente(true)
      } else {
        const data = await res.json()
        setClienteSeleccionado(data)
        setVisibleCedula(false)
        setVisibleVenta(true)
      }
    } catch (err) {
      showMessage('Error', 'Error buscando cliente', 'danger')
    }
  }

  const registrarNuevoCliente = async () => {
    try {
      const res = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoClienteForm)
      })
      const data = await res.json()
      setClienteSeleccionado(data)
      setVisibleNuevoCliente(false)
      setVisibleCedula(false)
      setVisibleVenta(true)
      showMessage('Éxito', 'Cliente creado correctamente', 'success')
    } catch (err) {
      showMessage('Error', 'No se pudo crear el cliente', 'danger')
    }
  }

  /* ======================
     ELIMINAR VENTA
  ====================== */
  const eliminarVenta = async (id) => {
    if (!window.confirm('¿Desea eliminar esta venta?')) return
    try {
      const res = await fetch(`${API_URL}/ventas/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error eliminando venta')
      fetchVentas()
      showMessage('Éxito', 'Venta eliminada', 'success')
    } catch (err) {
      showMessage('Error', err.message, 'danger')
    }
  }

  /* ======================
     FUNCION MODAL MENSAJE
  ====================== */
  const showMessage = (title, text, color = 'info') => {
    setMsgContent({ title, text, color })
    setVisibleMsg(true)
  }

  /* ======================
     RENDER
  ====================== */
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h5>Ventas</h5>
        <CButton onClick={() => setVisibleCedula(true)}>+ Nueva Venta</CButton>
      </CCardHeader>

      <CCardBody>
        <CTable bordered hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Cliente</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Total</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {ventas.map(v => (
              <CTableRow key={v.id}>
                <CTableDataCell>{v.id}</CTableDataCell>
                <CTableDataCell>{v.cliente}</CTableDataCell>
                <CTableDataCell>{v.fecha}</CTableDataCell>
                <CTableDataCell>${v.total.toFixed(2)}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={estadoColors[v.estado] || 'secondary'}>
                    {v.estado}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="info" onClick={() => verDetalleVenta(v.id)}>Ver</CButton>{' '}
                  <CButton size="sm" color="warning" onClick={() => editarVenta(v.id)}>Editar</CButton>{' '}
                  <CButton size="sm" color="danger" onClick={() => eliminarVenta(v.id)}>Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* MODAL CLIENTE POR CEDULA */}
      <CModal visible={visibleCedula} onClose={() => setVisibleCedula(false)}>
        <CModalHeader>Buscar cliente</CModalHeader>
        <CModalBody>
          <CFormInput label="Cédula" value={cedulaInput} onChange={e => setCedulaInput(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleCedula(false)}>Cancelar</CButton>
          <CButton color="primary" onClick={buscarCliente}>Buscar</CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL NUEVO CLIENTE */}
      <CModal visible={visibleNuevoCliente} onClose={() => setVisibleNuevoCliente(false)}>
        <CModalHeader>Nuevo Cliente</CModalHeader>
        <CModalBody>
          <CFormInput label="Nombre" value={nuevoClienteForm.nombre} onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, nombre: e.target.value })} />
          <CFormInput label="Dirección" value={nuevoClienteForm.direccion} onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, direccion: e.target.value })} />
          <CFormInput label="Teléfono" value={nuevoClienteForm.telefono} onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, telefono: e.target.value })} />
          <CFormInput label="Email" value={nuevoClienteForm.email} onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, email: e.target.value })} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleNuevoCliente(false)}>Cancelar</CButton>
          <CButton color="primary" onClick={registrarNuevoCliente}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL DETALLE DE VENTA */}
      <CModal visible={visibleDetalle} onClose={() => setVisibleDetalle(false)} size="lg">
        <CModalHeader>Detalle de Venta</CModalHeader>
        <CModalBody>
          <CTable small bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell>Cantidad</CTableHeaderCell>
                <CTableHeaderCell>Precio Unitario</CTableHeaderCell>
                <CTableHeaderCell>Subtotal</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {detalleSeleccionado.map((d, i) => (
                <CTableRow key={i}>
                  <CTableDataCell>{d.tb_idprodu}</CTableDataCell>
                  <CTableDataCell>{d.tb_cantida}</CTableDataCell>
                  <CTableDataCell>${Number(d.tb_precuni).toFixed(2)}</CTableDataCell>
                  <CTableDataCell>${Number(d.tb_subtota).toFixed(2)}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div className="text-end mt-2">
            <strong>
              Total: ${detalleSeleccionado.reduce((acc, d) => acc + Number(d.tb_subtota), 0).toFixed(2)}
            </strong>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetalle(false)}>Cerrar</CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL NUEVA/EDITAR VENTA */}
      <CModal visible={visibleVenta} onClose={() => setVisibleVenta(false)} size="lg">
        <CModalHeader>{modoEdicion ? 'Editar Venta' : 'Nueva Venta'}</CModalHeader>
        <CForm onSubmit={handleAddVenta}>
          <CModalBody>
            <div className="mb-2">
              <label className="form-label">Cliente</label>
              <p>{clienteSeleccionado?.tma_nombrec || 'No seleccionado'}</p>
            </div>

            {!modoEdicion && (
              <CButton size="sm" className="mb-3" onClick={() => setVisibleCedula(true)}>
                Cambiar cliente
              </CButton>
            )}

            <CFormSelect value={estadoVenta} onChange={e => setEstadoVenta(e.target.value)}>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagada">Pagada</option>
              <option value="Cancelada">Cancelada</option>
            </CFormSelect>

            <CButton size="sm" className="mt-3" onClick={handleAddDetalle}>+ Agregar producto</CButton>

            <CTable small bordered className="mt-2">
              <CTableBody>
                {detalleVenta.map((d, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell>
                      <CFormSelect size="sm" value={d.producto_id} onChange={e => handleDetalleChange(i, 'producto_id', e.target.value)}>
                        <option value="">Producto</option>
                        {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput size="sm" type="number" min="1" value={d.cantidad} onChange={e => handleDetalleChange(i, 'cantidad', e.target.value)} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput size="sm" type="number" value={d.precio_unitario} readOnly />
                    </CTableDataCell>
                    <CTableDataCell>${d.subtotal.toFixed(2)}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="danger" onClick={() => handleRemoveDetalle(i)}>X</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div className="text-end mt-2"><strong>Total: ${calcularTotal().toFixed(2)}</strong></div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleVenta(false)}>Cancelar</CButton>
            <CButton type="submit" disabled={!detalleVenta.length}>Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* MODAL MENSAJES */}
      <CModal visible={visibleMsg} onClose={() => setVisibleMsg(false)}>
        <CModalHeader>{msgContent.title}</CModalHeader>
        <CModalBody>
          <p>{msgContent.text}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color={msgContent.color} onClick={() => setVisibleMsg(false)}>Aceptar</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Ventas
