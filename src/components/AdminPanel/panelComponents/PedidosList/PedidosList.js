import "./PedidosList.css"

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from 'primereact/calendar';

import axios from 'axios';


export default function PedidosList() {
    let emptyorder = {
        id: null,
        zone: '',
        customer: null,
        total: 0,
        receptionStatus: 'PENDIENTE'
    };

    const [orders, setorders] = useState(null);
    const [orderDialog, setorderDialog] = useState(false);
    const [deleteorderDialog, setDeleteorderDialog] = useState(false);
    const [deleteordersDialog, setDeleteordersDialog] = useState(false);
    const [order, setorder] = useState(emptyorder);
    const [selectedOrders, setselectedOrders] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [receptionStatus, setReceptionStatus] = useState(null);
    const [payStatus, setPayStatus] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [deliveredDate, setdeliveredDate] = useState(null);
    const [payDate, setpayDate] = useState(null);

    


    useEffect(() => {
        axios("pedidosData.json").then((res) => setorders(res.data));
    }, []);

    const receptionStatusOptions = [
        { name: 'ENTREGADO'},
        { name: 'PENDIENTE'},
        { name: 'CANCELADO'},
    ];

    const payStatusOptions = [
        { name: "PAGADO"},
        { name: "IMPAGO"}
    ]

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setorder(emptyorder);
        setSubmitted(false);
        setorderDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setorderDialog(false);
    };

    const hideDeleteorderDialog = () => {
        setDeleteorderDialog(false);
    };

    const hideDeleteordersDialog = () => {
        setDeleteordersDialog(false);
    };

    const saveorder = () => {
        setSubmitted(true);

        if (order.name.trim()) {
            let _orders = [...orders];
            let _order = { ...order };

            if (order.id) {
                const index = findIndexById(order.id);

                _orders[index] = _order;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'order Updated', life: 3000 });
            } else {
                _order.id = createId();
                _order.image = 'order-placeholder.svg';
                _orders.push(_order);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'order Created', life: 3000 });
            }

            setorders(_orders);
            setorderDialog(false);
            setorder(emptyorder);
        }
    };

    const editOrder = (order) => {
        setorder({ ...order });
        setorderDialog(true);
    };

    const confirmDeleteorder = (order) => {
        setorder(order);
        setDeleteorderDialog(true);
    };

    const deleteorder = () => {
        let _orders = orders.filter((val) => val.id !== order.id);

        setorders(_orders);
        setDeleteorderDialog(false);
        setorder(emptyorder);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'order Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteordersDialog(true);
    };

    const deleteselectedOrders = () => {
        let _orders = orders.filter((val) => !selectedOrders.includes(val));

        setorders(_orders);
        setDeleteordersDialog(false);
        setselectedOrders(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'orders Deleted', life: 3000 });
    };

 

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _order = { ...order };

        _order[`${name}`] = val;

        setorder(_order);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _order = { ...order };

        _order[`${name}`] = val;

        setorder(_order);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2 ">
                <Button label="Nuevo" icon="pi pi-plus" severity="success" onClick={openNew} className="new" />
                <Button label="Borrar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} className="delete" disabled={!selectedOrders || !selectedOrders.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}  />;
    };


    
   

    const receptionStatusBodyTemplate = (rowData) => {
        return <Tag value={rowData.receptionStatus} severity={getSeverityOrder(rowData)}></Tag>;
    };

    const payStatusBodyTemplate = (rowData) => {
        return <Tag value={rowData.payStatus} severity={getSeverityPay(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2 edit-col-button" onClick={() => editOrder(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" className="delete-col-button" onClick={() => confirmDeleteorder(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverityOrder = (order) => {
        switch (order.receptionStatus) {
            case 'ENTREGADO':
                return 'success';

            case 'PENDIENTE':
                return 'secondary';

            case 'CANCELADO':
                return 'danger';

            default:
                return null;
        }
    };

    const getSeverityPay = (order) => {
        switch (order.payStatus) {
            case 'PAGADO':
                return 'success';

            case 'IMPAGO':
                return 'secondary';

            case 'CANCELADO':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between search-bar">
            <h4 className="m-0">Pedidos</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const orderDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveorder} />
        </React.Fragment>
    );
    const deleteorderDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteorderDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteorder} />
        </React.Fragment>
    );
    const deleteordersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteordersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteselectedOrders} />
        </React.Fragment>
    );

    const totalBodyTemplate = (rowData) => {
        return formatCurrency(rowData.total);
    };


    

    return (
        <div className='totalComponent'>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={orders} selection={selectedOrders} onSelectionChange={(e) => setselectedOrders(e.value)} fit="true"
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} //responsiveLayout="stack" breakpoint='750px' 
                        reorderableColumns reorderableRows onRowReorder={(e) => setorders(e.value)} 
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} pedidos" globalFilter={globalFilter} header={header}
                        className={"headersPedidos"} 
                        >
                    <Column headerClassName="hidden-header" key="Seleccionar" selectionMode="multiple" exportable={false}  ></Column>
                    <Column field="id" header="N°" headerClassName="hidden-header" className="ID" sortable  ></Column>
                    <Column field="creationDate" header="Fecha Creado" className="Fecha Creado" sortable ></Column>
                    {/*<Column field="zone" header="Zona" sortable className="Zona" ></Column>*/}
                    {/*<Column field="ubication" header="Ubicación" className="Ubicación" headerClassName="hidden-header" ></Column>*/}
                    <Column field="customerName" headerClassName="hidden-header" className="Cliente" header="Cliente" sortable ></Column>
                    {/*<Column field="customerTel" className="Teléfono" header="Teléfono" sortable headerClassName="hidden-header" ></Column>*/}
                    <Column field="detail" header="Detalle" className="Detalle" headerClassName="hidden-header" ></Column>
                    <Column field="observations" header="Observaciones" className="Observaciones" headerClassName="hidden-header" ></Column>
                    <Column field="total" header="Total" body={totalBodyTemplate} sortable className="Total" ></Column>
                    <Column field="receptionStatus" header="Entrega" body={receptionStatusBodyTemplate} className="Entrega" sortable ></Column>
                    <Column field="deliveredDate" header="Fecha Entregado" className="Fecha Entregado" sortable ></Column>
                    <Column field="payStatus" header="Pago" body={payStatusBodyTemplate} sortable className="Pago" ></Column>
                    <Column field="payDate" header="Fecha Pagado" className="Fecha Pagado" sortable ></Column>
                    <Column field="payMethod" header="Medio" className="Medio" sortable  ></Column>                     
                    <Column field="editNoField"  body={actionBodyTemplate} exportable={false} className="Editar" ></Column>
                    {/*<Column field="moveNoField" key="mover" columnKey='mover' className="Mover" rowReorder  > </Column>*/}
                    
                </DataTable>
            </div>

            <Dialog visible={orderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Editar Pedido" modal className="p-fluid" footer={orderDialogFooter} onHide={hideDialog}>
                {order.image && <img src={`https://primefaces.org/cdn/primereact/images/order/${order.image}`} alt={order.image} className="order-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="id" className="font-bold">
                        N° Pedido
                    </label>
                    <InputText id="id" value={order.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus className={classNames({ 'p-invalid': submitted && !order.id })} />
                    {submitted && !order.id && <small className="p-error">Id requerido</small>}
                </div>

                <div className="field">
                    <label htmlFor="customerName" className="font-bold">
                        Cliente
                    </label>
                    <InputText id="customerName" value={order.customerName} onChange={(e) => onInputChange(e, 'customerName')} required autoFocus className={classNames({ 'p-invalid': submitted && !order.customerName })} />
                    {submitted && !order.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Detalle del Pedido
                    </label>
                    <InputTextarea id="order-detail" value={order.detail} onChange={(e) => onInputChange(e, 'order-detail')} required rows={3} cols={20} />
                    </div>
                
                <div className="field">
                    <label htmlFor="zone" className="font-bold">
                        Zona
                    </label>
                    <InputText id="zone" value={order.zone} onChange={(e) => onInputChange(e, 'zone')} required autoFocus className={classNames({ 'p-invalid': submitted && !order.zone })} />
                    {submitted && !order.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="ubication" className="font-bold">
                        Ubicación
                    </label>
                    <InputText id="ubication" value={order.ubication} onChange={(e) => onInputChange(e, 'ubication')} required autoFocus className={classNames({ 'p-invalid': submitted && !order.ubication })} />
                    {submitted && !order.ubication && <small className="p-error">La ubicación es requerida</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="total" className="font-bold">
                            Total
                        </label>
                        <InputNumber id="total" value={order.total} onValueChange={(e) => onInputNumberChange(e, 'total')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    
                </div>

                <div className="field">
                    <label htmlFor="receptionStatus" className="font-bold">
                        Entrega
                    </label>
                    <Dropdown value={receptionStatus} onChange={(e) => setReceptionStatus(e.value)} options={receptionStatusOptions} optionLabel="name" placeholder={order.receptionStatus} className="w-full md:w-14rem" />
                    
                </div>

                <div className="field">
                    <label htmlFor="creationDate" className="font-bold">
                        Fecha Creado
                    </label>
                    <InputText id="creationDate" disabled placeholder={order.creationDate}  />
                   
                </div>

                <div className="field">
                    <label htmlFor="deliveredDate" className="font-bold">
                        Fecha Entregado
                    </label>
                    <Calendar value={deliveredDate} onChange={(e) => setdeliveredDate(e.value)} id="deliveredDate" placeholder={order.deliveredDate} className={classNames({ 'p-invalid': submitted && !order.deliveredDate })} dateFormat="dd/mm/yy" />
                    
                </div>

                <div className="field">
                    <label htmlFor="payDate" className="font-bold">
                        Fecha Pagado
                    </label>
                    <Calendar value={payDate} onChange={(e) => setpayDate(e.value)} id="deliveredDate" placeholder={order.payDate} className={classNames({ 'p-invalid': submitted && !order.payDate })} dateFormat="dd/mm/yy" />
                    
                </div>

                <div className="field">
                    <label htmlFor="payStatus" className="font-bold">
                        Pago
                    </label>
                    <Dropdown value={payStatus} onChange={(e) => setPayStatus(e.value)} options={payStatusOptions} optionLabel="name" placeholder={order.payStatus} className="w-full md:w-14rem" />
                    
                </div>

            </Dialog>

            <Dialog visible={deleteorderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteorderDialogFooter} onHide={hideDeleteorderDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {order && (
                        <span>
                            ¿Está seguro que desea eliminar? <b>{order.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteordersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteordersDialogFooter} onHide={hideDeleteordersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {order && <span>¿Está seguro de eliminar el pedido seleccionado?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        