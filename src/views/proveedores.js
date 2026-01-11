import { useEffect, useState } from 'react'
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
  CBadge,
} from '@coreui/react'
import Swal from 'sweetalert2'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([])
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    rif: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  })

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroTelefono, setFiltroTelefono] = useState('')

  const API_URL = 'http://localhost:4000/api/proveedores'

  // Obtener todos los proveedores
  const fetchProveedores = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      const proveedoresMapeados = data.map((item) => ({
        id: item.tma_idprove, // ID auto-incremental
        rif: item.tma_rif, // RIF manual
        nombre: item.tma_nombrep,
        direccion: item.tma_direcc,
        telefono: item.tma_telefon,
        email: item.tma_emailpro,
      }))
      setProveedores(proveedoresMapeados)
    } catch (err) {
      console.error('Error obteniendo proveedores:', err)
    }
  }

  useEffect(() => {
    fetchProveedores()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    let error = ''
    if (value.trim() === '') {
      error = 'Este campo es obligatorio'
    } else {
      if (name === 'nombre' && !/^[a-zA-Z\s]+$/.test(value)) {
        error = 'Solo se permiten letras y espacios'
      }
      if (name === 'telefono' && !/^\d*$/.test(value)) {
        error = 'Solo se permiten números'
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.rif.trim()) newErrors.rif = 'El RIF es obligatorio'

    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    else if (!/^[a-zA-Z\s]+$/.test(form.nombre))
      newErrors.nombre = 'Solo se permiten letras y espacios'

    if (!form.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria'

    if (!form.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio'
    else if (!/^\d+$/.test(form.telefono)) newErrors.telefono = 'Solo se permiten números'

    if (!form.email.trim()) newErrors.email = 'El email es obligatorio'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Formato de email inválido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Agregar proveedor
  const handleAddProveedor = async (e) => {
  e.preventDefault()

  if (!validateForm()) return

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const nuevoProveedor = await res.json()

    setProveedores([
      ...proveedores,
      {
        id: nuevoProveedor.tma_idprove,
        rif: nuevoProveedor.tma_rif,
        nombre: nuevoProveedor.tma_nombrep,
        direccion: nuevoProveedor.tma_direcc,
        telefono: nuevoProveedor.tma_telefon,
        email: nuevoProveedor.tma_emailpro,
      },
    ])

    setVisible(false)
    setForm({ rif: '', nombre: '', direccion: '', telefono: '', email: '' })
    setErrors({})

    // SweetAlert2 de éxito
    Swal.fire({
      icon: 'success',
      title: 'Proveedor creado',
      text: `El proveedor "${nuevoProveedor.tma_nombrep}" se ha agregado correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    })
  } catch (err) {
    console.error('Error creando proveedor:', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al crear el proveedor. 😓',
    })
  }
}


  // Abrir modal de edición
  const handleEditProveedor = (proveedor) => {
    setSelectedProveedor(proveedor)
    setForm({
      rif: proveedor.rif,
      nombre: proveedor.nombre,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      email: proveedor.email,
    })
    setErrors({})
    setEditVisible(true)
  }

  // Actualizar proveedor
 const handleUpdateProveedor = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}/${selectedProveedor.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rif: form.rif,
        nombre: form.nombre,
        direccion: form.direccion,
        telefono: form.telefono,
        email: form.email,
      }),
    });

    const updatedProveedor = await res.json();

    if (!res.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: updatedProveedor.error || 'No se pudo actualizar el proveedor.',
      });
      return;
    }

    // Actualizar la lista en el estado
    setProveedores(
      proveedores.map((p) =>
        p.id === updatedProveedor.tma_idprove
          ? {
              id: updatedProveedor.tma_idprove,
              rif: updatedProveedor.tma_rif,
              nombre: updatedProveedor.tma_nombrep,
              direccion: updatedProveedor.tma_direcc,
              telefono: updatedProveedor.tma_telefon,
              email: updatedProveedor.tma_emailpro,
            }
          : p
      )
    );

    setEditVisible(false);
    setForm({ rif: '', nombre: '', direccion: '', telefono: '', email: '' });
    setSelectedProveedor(null);

    // ✅ SweetAlert2 de éxito
    Swal.fire({
      icon: 'success',
      title: 'Proveedor actualizado',
      text: `${updatedProveedor.tma_nombrep} ha sido actualizado correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    });

  } catch (err) {
    console.error('Error actualizando proveedor:', err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error inesperado al actualizar el proveedor.',
    });
  }
};


  // Eliminar proveedor con SweetAlert2
const handleDeleteProveedor = async (proveedor) => {
  try {
    // Confirmación de eliminación
    const result = await Swal.fire({
      title: `¿Eliminar a ${proveedor.nombre}?`,
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return; // Si canceló, no hace nada

    // Llamada a la API para eliminar
    const res = await fetch(`${API_URL}/${proveedor.id}`, { method: 'DELETE' });
    const data = await res.json();

    if (!res.ok) {
      // Error de la API
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar',
        text: data.error || 'Este proveedor no puede ser eliminado.',
      });
      return;
    }

    // Actualiza la lista eliminando el proveedor
    setProveedores(proveedores.filter((p) => p.id !== proveedor.id));

    // Mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Proveedor eliminado',
      text: `${proveedor.nombre} ha sido eliminado correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    });

  } catch (err) {
    console.error('Error eliminando proveedor:', err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error inesperado al eliminar el proveedor.',
    });
  }
};


  // Filtros
  const proveedoresFiltrados = proveedores.filter((item) => {
    const matchNombre = filtroNombre
      ? item.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
      : true
    const matchTelefono = filtroTelefono ? item.telefono.includes(filtroTelefono) : true
    return matchNombre && matchTelefono
  })

  return (
    <CCard
      style={{
        background: 'linear-gradient(135deg, #E6EBE0 60%, #9BC1BC 100%)',
        border: 'none',
        boxShadow: '0 2px 16px 0 #9BC1BC33',
      }}
    >
      <CCardHeader
        className="d-flex justify-content-between align-items-center"
        style={{ background: '#ED6A5A', color: '#fff' }}
      >
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>
          Proveedores
        </h5>
        <CButton
          color="light"
          style={{ color: '#ED6A5A', fontWeight: 'bold' }}
          onClick={() => setVisible(true)}
        >
          + Nuevo Proveedor
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros */}
        <div
          className="mb-4 d-flex flex-wrap gap-3 align-items-end"
          style={{ background: '#F4F1BB', borderRadius: 8, padding: 16 }}
        >
          <CFormInput
            size="sm"
            style={{ maxWidth: 200 }}
            label="Nombre"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          <CFormInput
            size="sm"
            style={{ maxWidth: 160 }}
            label="Teléfono"
            placeholder="Buscar por teléfono"
            value={filtroTelefono}
            onChange={(e) => setFiltroTelefono(e.target.value)}
          />
          {(filtroNombre || filtroTelefono) && (
            <CButton
              color="secondary"
              size="sm"
              variant="outline"
              onClick={() => {
                setFiltroNombre('')
                setFiltroTelefono('')
              }}
            >
              Limpiar filtros
            </CButton>
          )}
        </div>

        {/* Tabla */}
        <CTable
          hover
          responsive
          bordered
          align="middle"
          className="shadow-sm"
          style={{ background: '#fff', borderRadius: 8 }}
        >
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>RIF</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Dirección</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {proveedoresFiltrados.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={7} className="text-center text-muted">
                  No hay proveedores registrados con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            ) : (
              proveedoresFiltrados.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.rif}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge
                      color="info"
                      style={{ fontSize: 13, background: '#36C9C6', color: '#fff' }}
                    >
                      {item.nombre}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{item.direccion}</CTableDataCell>
                  <CTableDataCell>{item.telefono}</CTableDataCell>
                  <CTableDataCell>{item.email}</CTableDataCell>
                  <CTableDataCell>
  <CButton
    size="sm"
    color="warning"
    variant="outline"
    className="me-2"
    onClick={() => handleEditProveedor(item)}
    title="Editar proveedor"
  >
    <CIcon icon={cilPencil} />
  </CButton>

  <CButton
    size="sm"
    color="danger"
    variant="outline"
    onClick={() => handleDeleteProveedor(item)}
    title="Eliminar proveedor"
  >
    <CIcon icon={cilTrash} />
  </CButton>
</CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nuevo proveedor */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#ED6A5A', color: '#fff' }}>
          <strong>Nuevo Proveedor</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddProveedor}>
          <CModalBody>
            {/* RIF */}
            <CFormInput
              label="RIF"
              name="rif"
              value={form.rif}
              onChange={handleInputChange}
              invalid={!!errors.rif}
            />
            {errors.rif && <p className="text-danger small mt-1">{errors.rif}</p>}

            {/* Nombre */}
            <CFormInput
              className="mt-2"
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleInputChange}
              invalid={!!errors.nombre}
            />
            {errors.nombre && <p className="text-danger small mt-1">{errors.nombre}</p>}

            {/* Dirección */}
            <CFormInput
              className="mt-2"
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleInputChange}
              invalid={!!errors.direccion}
            />
            {errors.direccion && <p className="text-danger small mt-1">{errors.direccion}</p>}

            {/* Teléfono */}
            <CFormInput
              className="mt-2"
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleInputChange}
              invalid={!!errors.telefono}
            />
            {errors.telefono && <p className="text-danger small mt-1">{errors.telefono}</p>}

            {/* Email */}
            <CFormInput
              className="mt-2"
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              invalid={!!errors.email}
            />
            {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal de error al eliminar */}
      <CModal visible={errorModal} onClose={() => setErrorModal(false)}>
        <CModalHeader style={{ background: '#D32F2F', color: '#fff' }}>
          <strong>No se puede eliminar</strong>
        </CModalHeader>

        <CModalBody style={{ fontSize: '16px' }}>
          Este proveedor <strong>no puede ser eliminado</strong> porque tiene
          <strong> compras asociadas</strong>.
        </CModalBody>

        <CModalFooter>
          <CButton color="danger" onClick={() => setErrorModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para editar proveedor */}
      <CModal visible={editVisible} onClose={() => setEditVisible(false)}>
        <CModalHeader style={{ background: '#FFB74D', color: '#fff' }}>
          <strong>Editar Proveedor</strong>
        </CModalHeader>
        <CForm onSubmit={handleUpdateProveedor}>
          <CModalBody>
            {/* RIF (solo lectura) */}
            <CFormInput label="RIF" name="rif" value={form.rif} readOnly />

            {/* Nombre */}
            <CFormInput
              className="mt-2"
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleInputChange}
              invalid={!!errors.nombre}
            />
            {errors.nombre && <p className="text-danger small mt-1">{errors.nombre}</p>}

            {/* Dirección */}
            <CFormInput
              className="mt-2"
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleInputChange}
              invalid={!!errors.direccion}
            />
            {errors.direccion && <p className="text-danger small mt-1">{errors.direccion}</p>}

            {/* Teléfono */}
            <CFormInput
              className="mt-2"
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleInputChange}
              invalid={!!errors.telefono}
            />
            {errors.telefono && <p className="text-danger small mt-1">{errors.telefono}</p>}

            {/* Email */}
            <CFormInput
              className="mt-2"
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              invalid={!!errors.email}
            />
            {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              Actualizar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Proveedores
