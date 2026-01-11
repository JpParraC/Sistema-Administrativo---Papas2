import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader,
  CModalBody, CModalFooter, CForm, CFormInput, CFormSelect, CBadge
} from '@coreui/react'

// ================== API ==================
const API_PRODUCTOS_COSECHA = 'http://localhost:4000/api/productos/cosecha'
const API_PRODUCTOS_INSUMO = 'http://localhost:4000/api/productos/insumo'
const API_PERSONAL = 'http://localhost:4000/api/personal'
const API_PRODUCCION = 'http://localhost:4000/api/producc'

const Produccion = () => {
  const [produccion, setProduccion] = useState([])
  const [productosCosecha, setProductosCosecha] = useState([])
  const [productosInsumo, setProductosInsumo] = useState([])
  const [personal, setPersonal] = useState([])
  const [visible, setVisible] = useState(false)

  const [form, setForm] = useState({
    tb_idprodut: '',
    fecha_siembra: '',
    fecha_cosecha: '',
    cantidad_esperada: '',
    cantidad_cosechada: '',
    area_cultivo: '',
    costo_produccion: '',
    responsable_id: '',
    insumos: [],
    tb_idproduc: null,
  })

  // ================== MODALES ==================
  const [visibleMsg, setVisibleMsg] = useState(false)
  const [msgContent, setMsgContent] = useState({ title: '', text: '', color: 'info' })

  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [produccionAEliminar, setProduccionAEliminar] = useState(null)

  const showMessage = (title, text, color = 'info') => {
    setMsgContent({ title, text, color })
    setVisibleMsg(true)
  }

  const showConfirm = (item) => {
    setProduccionAEliminar(item)
    setVisibleConfirm(true)
  }

  // ================== CARGA INICIAL ==================
  useEffect(() => {
    fetchProduccion()
    fetchProductosCosecha()
    fetchProductosInsumo()
    fetchPersonal()
  }, [])

  // ================== FETCH ==================
  const fetchProduccion = async () => {
    try {
      const res = await fetch(API_PRODUCCION)
      const data = await res.json()
      setProduccion(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error cargando producción', error)
      showMessage('Error', 'No se pudo cargar la producción', 'danger')
      setProduccion([])
    }
  }

  const fetchProductosCosecha = async () => {
    try {
      const res = await fetch(API_PRODUCTOS_COSECHA)
      const data = await res.json()
      setProductosCosecha(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error cargando productos de cosecha', error)
      showMessage('Error', 'No se pudieron cargar los productos de cosecha', 'danger')
    }
  }

  const fetchProductosInsumo = async () => {
    try {
      const res = await fetch(API_PRODUCTOS_INSUMO)
      const data = await res.json()
      setProductosInsumo(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error cargando productos de insumo', error)
      showMessage('Error', 'No se pudieron cargar los productos de insumo', 'danger')
    }
  }

  const fetchPersonal = async () => {
    try {
      const res = await fetch(API_PERSONAL)
      const data = await res.json()
      setPersonal(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error cargando personal', error)
      showMessage('Error', 'No se pudo cargar el personal', 'danger')
      setPersonal([])
    }
  }

  // ================== HANDLERS ==================
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleInsumoChange = (index, field, value) => {
    const newInsumos = [...form.insumos]
    newInsumos[index][field] = value
    setForm({ ...form, insumos: newInsumos })
  }

  const addInsumo = () => {
    setForm({
      ...form,
      insumos: [...form.insumos, { producto_id: '', cantidad: 0 }]
    })
  }

  const removeInsumo = (index) => {
    const newInsumos = [...form.insumos]
    newInsumos.splice(index, 1)
    setForm({ ...form, insumos: newInsumos })
  }

  // ================== CREAR / EDITAR ==================
  const handleAddProduccion = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        tb_idprodut: Number(form.tb_idprodut),
        tb_fechsiem: form.fecha_siembra,
        tb_fechcose: form.fecha_cosecha,
        tb_canespel: Number(form.cantidad_esperada),
        tb_canoscoh: form.cantidad_cosechada ? Number(form.cantidad_cosechada) : 0,
        tb_areacult: Number(form.area_cultivo),
        tb_costprod: Number(form.costo_produccion),
        tb_idrespon: Number(form.responsable_id),
        insumos: form.insumos.map(i => ({
          producto_id: Number(i.producto_id),
          cantidad: Number(i.cantidad)
        }))
      }

      let res
      if (form.tb_idproduc) {
        res = await fetch(`${API_PRODUCCION}/${form.tb_idproduc}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch(API_PRODUCCION, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) throw new Error('Error al guardar producción')

      await fetchProduccion()
      setVisible(false)
      setForm({
        tb_idprodut: '',
        fecha_siembra: '',
        fecha_cosecha: '',
        cantidad_esperada: '',
        cantidad_cosechada: '',
        area_cultivo: '',
        costo_produccion: '',
        responsable_id: '',
        insumos: [],
        tb_idproduc: null,
      })

      showMessage(
        'Éxito',
        form.tb_idproduc ? 'Producción actualizada correctamente' : 'Producción creada correctamente',
        'success'
      )
    } catch (error) {
      console.error(error)
      showMessage('Error', 'No se pudo guardar la producción', 'danger')
    }
  }

  // ================== EDITAR ==================
  const handleEditProduccion = (item) => {
    const formatDate = (dateString) => {
      if (!dateString) return ''
      const d = new Date(dateString)
      const year = d.getFullYear()
      const month = (d.getMonth() + 1).toString().padStart(2, '0')
      const day = d.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    const insumos = item.insumos || []

    setForm({
      tb_idprodut: item.tb_idprodut,
      fecha_siembra: formatDate(item.fecha_siembra),
      fecha_cosecha: formatDate(item.fecha_cosecha),
      cantidad_esperada: item.cantidad_esperada,
      cantidad_cosechada: item.cantidad_cosechada,
      area_cultivo: item.area_cultivo,
      costo_produccion: item.costo_produccion,
      responsable_id: item.tb_idrespon,
      insumos,
      tb_idproduc: item.id,
    })

    setVisible(true)
  }

  // ================== ELIMINAR ==================
  const handleDeleteProduccion = async () => {
    if (!produccionAEliminar) return
    try {
      const res = await fetch(`${API_PRODUCCION}/${produccionAEliminar.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar producción')

      setProduccion(produccion.filter(p => p.id !== produccionAEliminar.id))
      showMessage('Éxito', 'Producción eliminada correctamente', 'success')
    } catch (error) {
      console.error(error)
      showMessage('Error', 'No se pudo eliminar la producción', 'danger')
    } finally {
      setVisibleConfirm(false)
      setProduccionAEliminar(null)
    }
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5>Producción</h5>
        <CButton color="primary" onClick={() => setVisible(true)}>+ Nueva Producción</CButton>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Producto</CTableHeaderCell>
              <CTableHeaderCell>Siembra</CTableHeaderCell>
              <CTableHeaderCell>Cosecha</CTableHeaderCell>
              <CTableHeaderCell>Cant. Esperada</CTableHeaderCell>
              <CTableHeaderCell>Cant. Cosechada</CTableHeaderCell>
              <CTableHeaderCell>Área</CTableHeaderCell>
              <CTableHeaderCell>Costo</CTableHeaderCell>
              <CTableHeaderCell>Responsable</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {produccion.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell><CBadge color="info">{item.producto}</CBadge></CTableDataCell>
                <CTableDataCell>{new Date(item.fecha_siembra).toLocaleDateString()}</CTableDataCell>
                <CTableDataCell>{new Date(item.fecha_cosecha).toLocaleDateString()}</CTableDataCell>
                <CTableDataCell>{item.cantidad_esperada}</CTableDataCell>
                <CTableDataCell>{item.cantidad_cosechada}</CTableDataCell>
                <CTableDataCell>{item.area_cultivo}</CTableDataCell>
                <CTableDataCell>${Number(item.costo_produccion).toFixed(2)}</CTableDataCell>
                <CTableDataCell>{item.responsable}</CTableDataCell>

                <CTableDataCell className="text-center">
                  <CButton
                    size="sm"
                    color="warning"
                    variant="outline"
                    className="me-2"
                    onClick={() => handleEditProduccion(item)}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    variant="outline"
                    onClick={() => showConfirm(item)}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* ================== MODAL CREAR / EDITAR ================== */}
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <strong>{form.tb_idproduc ? 'Editar Producción' : 'Nueva Producción'}</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddProduccion}>
          <CModalBody>
            <CFormSelect
              label="Producto"
              name="tb_idprodut"
              value={form.tb_idprodut}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione producto</option>
              {productosCosecha.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </CFormSelect>

            <CFormInput className="mt-2" type="date" label="Fecha de siembra" name="fecha_siembra" value={form.fecha_siembra} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="date" label="Fecha de cosecha" name="fecha_cosecha" value={form.fecha_cosecha} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="number" label="Cantidad esperada" name="cantidad_esperada" value={form.cantidad_esperada} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="number" label="Cantidad cosechada" name="cantidad_cosechada" value={form.cantidad_cosechada} onChange={handleInputChange} />
            <CFormInput className="mt-2" type="number" label="Área cultivo" name="area_cultivo" value={form.area_cultivo} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="number" label="Costo producción" name="costo_produccion" value={form.costo_produccion} onChange={handleInputChange} required />
            <CFormSelect className="mt-2" label="Responsable" name="responsable_id" value={form.responsable_id} onChange={handleInputChange} required>
              <option value="">Seleccione responsable</option>
              {personal.map(p => <option key={p.tma_idperso} value={p.tma_idperso}>{p.tma_nombrep}</option>)}
            </CFormSelect>


            {/* ================== INSUMOS ================== */}
            <div className="mt-3">
              <h6>Insumos usados</h6>
              {form.insumos.map((i, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2 gap-2">
                  <CFormSelect
                    value={i.producto_id}
                    onChange={(e) => handleInsumoChange(idx, 'producto_id', e.target.value)}
                    required
                  >
                    <option value="">Seleccione insumo</option>
                    {productosInsumo.map(p => (
                      <option
                        key={p.id}
                        value={p.id}
                        disabled={p.stock === 0} // deshabilita si no hay stock
                      >
                        {p.nombre} {p.stock > 0 ? `(Disponible: ${p.stock})` : '(Falta comprar)'}
                      </option>
                    ))}
                  </CFormSelect>

                  <CFormInput
                    type="number"
                    placeholder="Cantidad"
                    value={i.cantidad}
                    onChange={(e) => handleInsumoChange(idx, 'cantidad', e.target.value)}
                    min={0}
                    max={i.producto_id ? productosInsumo.find(p => p.id === Number(i.producto_id))?.stock || 0 : undefined}
                    required
                  />

                  <CButton color="danger" size="sm" onClick={() => removeInsumo(idx)}>Eliminar</CButton>
                </div>
              ))}

              <CButton color="secondary" size="sm" onClick={addInsumo}>+ Agregar Insumo</CButton>
            </div>

          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* ================== MODAL MENSAJE ================== */}
      <CModal visible={visibleMsg} onClose={() => setVisibleMsg(false)}>
        <CModalHeader>{msgContent.title}</CModalHeader>
        <CModalBody><p>{msgContent.text}</p></CModalBody>
        <CModalFooter>
          <CButton color={msgContent.color} onClick={() => setVisibleMsg(false)}>Aceptar</CButton>
        </CModalFooter>
      </CModal>

      {/* ================== MODAL CONFIRMAR ELIMINAR ================== */}
      <CModal visible={visibleConfirm} onClose={() => setVisibleConfirm(false)}>
        <CModalHeader>Confirmar Eliminación</CModalHeader>
        <CModalBody>
          <p>¿Está seguro que desea eliminar la producción "{produccionAEliminar?.producto}"?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleConfirm(false)}>Cancelar</CButton>
          <CButton color="danger" onClick={handleDeleteProduccion}>Eliminar</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Produccion
