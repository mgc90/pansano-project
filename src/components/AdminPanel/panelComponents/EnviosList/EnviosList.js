import "./EnviosList.css"

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
//import { Calendar } from 'primereact/calendar';

import axios from 'axios';


export default function EnviosList() {
    let emptydelivery = {
        id: null,
        zone: '',
        customer: null,
        total: 0,
        receptionStatus: 'PENDIENTE'
    };

    const [deliverys, setdeliverys] = useState(null);
    const [deliveryDialog, setdeliveryDialog] = useState(false);
    const [deletedeliveryDialog, setDeletedeliveryDialog] = useState(false);
    const [deletedeliverysDialog, setDeletedeliverysDialog] = useState(false);
    const [delivery, setdelivery] = useState(emptydelivery);
    const [selecteddeliverys, setselecteddeliverys] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [receptionStatus, setReceptionStatus] = useState(null);
    const [payStatus, setPayStatus] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    //const [deliveredDate, setdeliveredDate] = useState(null);
    //const [payDate, setpayDate] = useState(null);

    


    useEffect(() => {
        axios("ejemploEnvíos.json").then((res) => setdeliverys(res.data));
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
        setdelivery(emptydelivery);
        setSubmitted(false);
        setdeliveryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setdeliveryDialog(false);
    };

    const hideDeletedeliveryDialog = () => {
        setDeletedeliveryDialog(false);
    };

    const hideDeletedeliverysDialog = () => {
        setDeletedeliverysDialog(false);
    };

    const savedelivery = () => {
        setSubmitted(true);

        if (delivery.name.trim()) {
            let _deliverys = [...deliverys];
            let _delivery = { ...delivery };

            if (delivery.id) {
                const index = findIndexById(delivery.id);

                _deliverys[index] = _delivery;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'delivery Updated', life: 3000 });
            } else {
                _delivery.id = createId();
                _delivery.image = 'delivery-placeholder.svg';
                _deliverys.push(_delivery);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'delivery Created', life: 3000 });
            }

            setdeliverys(_deliverys);
            setdeliveryDialog(false);
            setdelivery(emptydelivery);
        }
    };

    const editdelivery = (delivery) => {
        setdelivery({ ...delivery });
        setdeliveryDialog(true);
    };

    const confirmDeletedelivery = (delivery) => {
        setdelivery(delivery);
        setDeletedeliveryDialog(true);
    };

    const deletedelivery = () => {
        let _deliverys = deliverys.filter((val) => val.id !== delivery.id);

        setdeliverys(_deliverys);
        setDeletedeliveryDialog(false);
        setdelivery(emptydelivery);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'delivery Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < deliverys.length; i++) {
            if (deliverys[i].id === id) {
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
        setDeletedeliverysDialog(true);
    };

    const deleteselecteddeliverys = () => {
        let _deliverys = deliverys.filter((val) => !selecteddeliverys.includes(val));

        setdeliverys(_deliverys);
        setDeletedeliverysDialog(false);
        setselecteddeliverys(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'deliverys Deleted', life: 3000 });
    };

 

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _delivery = { ...delivery };

        _delivery[`${name}`] = val;

        setdelivery(_delivery);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _delivery = { ...delivery };

        _delivery[`${name}`] = val;

        setdelivery(_delivery);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2 ">
                <Button label="Nuevo" icon="pi pi-plus" severity="success" onClick={openNew} className="new" />
                <Button label="Borrar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} className="delete" disabled={!selecteddeliverys || !selecteddeliverys.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}  />;
    };


    
   

    const receptionStatusBodyTemplate = (rowData) => {
        return <Tag value={rowData.receptionStatus} severity={getSeveritydelivery(rowData)}></Tag>;
    };

    const payStatusBodyTemplate = (rowData) => {
        return <Tag value={rowData.payStatus} severity={getSeverityPay(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2 edit-col-button" onClick={() => editdelivery(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" className="delete-col-button" onClick={() => confirmDeletedelivery(rowData)} />
            </React.Fragment>
        );
    };

    const getSeveritydelivery = (delivery) => {
        switch (delivery.receptionStatus) {
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

    const getSeverityPay = (delivery) => {
        switch (delivery.payStatus) {
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
            <h4 className="m-0">Envíos</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const deliveryDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={savedelivery} />
        </React.Fragment>
    );
    const deletedeliveryDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletedeliveryDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deletedelivery} />
        </React.Fragment>
    );
    const deletedeliverysDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletedeliverysDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteselecteddeliverys} />
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

                <DataTable ref={dt} value={deliverys} selection={selecteddeliverys} onSelectionChange={(e) => setselecteddeliverys(e.value)} fit="true"
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} //responsiveLayout="stack" breakpoint='750px' 
                        redeliveryableColumns redeliveryableRows onRowRedelivery={(e) => setdeliverys(e.value)} 
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} Envios" globalFilter={globalFilter} header={header}
                        className={"headersEnvios"} 
                        >
                    <Column headerClassName="hidden-header" key="Seleccionar" selectionMode="multiple" exportable={false}  ></Column>
                    <Column field="id" header="N°" headerClassName="hidden-header" className="ID" sortable  ></Column>
                    <Column field="zone" header="Zona" sortable className="Zona" ></Column>
                    <Column field="ubication" header="Ubicación" className="Ubicación" headerClassName="hidden-header" ></Column>
                    <Column field="customerName" headerClassName="hidden-header" className="Cliente" header="Cliente" sortable ></Column>
                    <Column field="customerTel" className="Teléfono" header="Teléfono" sortable headerClassName="hidden-header" ></Column>
                    <Column field="detail" header="Detalle" className="Detalle" headerClassName="hidden-header" ></Column>
                    <Column field="observations" header="Observaciones" className="Observaciones" headerClassName="hidden-header" ></Column>
                    <Column field="total" header="Total" body={totalBodyTemplate} sortable className="Total" ></Column>
                    <Column field="receptionStatus" header="Entrega" body={receptionStatusBodyTemplate} className="Entrega" sortable ></Column>

                    <Column field="payStatus" header="Pago" body={payStatusBodyTemplate} sortable className="Pago" ></Column>
                    
                    <Column field="payMethod" header="Medio" className="Medio" sortable  ></Column>                     
                    <Column field="editNoField"  body={actionBodyTemplate} exportable={false} className="Editar" ></Column>
                    {/*<Column field="moveNoField" key="mover" columnKey='mover' className="Mover" rowRedelivery  > </Column>*/}
                    
                </DataTable>
            </div>

            <Dialog visible={deliveryDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Editar Envio" modal className="p-fluid" footer={deliveryDialogFooter} onHide={hideDialog}>
                {delivery.image && <img src={`https://primefaces.org/cdn/primereact/images/delivery/${delivery.image}`} alt={delivery.image} className="delivery-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="id" className="font-bold">
                        N° Envio
                    </label>
                    <InputText id="id" value={delivery.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus className={classNames({ 'p-invalid': submitted && !delivery.id })} />
                    {submitted && !delivery.id && <small className="p-error">Id requerido</small>}
                </div>

                <div className="field">
                    <label htmlFor="customerName" className="font-bold">
                        Cliente
                    </label>
                    <InputText id="customerName" value={delivery.customerName} onChange={(e) => onInputChange(e, 'customerName')} required autoFocus className={classNames({ 'p-invalid': submitted && !delivery.customerName })} />
                    {submitted && !delivery.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Detalle del Envio
                    </label>
                    <InputTextarea id="delivery-detail" value={delivery.detail} onChange={(e) => onInputChange(e, 'delivery-detail')} required rows={3} cols={20} />
                    </div>
                
                <div className="field">
                    <label htmlFor="zone" className="font-bold">
                        Zona
                    </label>
                    <InputText id="zone" value={delivery.zone} onChange={(e) => onInputChange(e, 'zone')} required autoFocus className={classNames({ 'p-invalid': submitted && !delivery.zone })} />
                    {submitted && !delivery.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="ubication" className="font-bold">
                        Ubicación
                    </label>
                    <InputText id="ubication" value={delivery.ubication} onChange={(e) => onInputChange(e, 'ubication')} required autoFocus className={classNames({ 'p-invalid': submitted && !delivery.ubication })} />
                    {submitted && !delivery.ubication && <small className="p-error">La ubicación es requerida</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="total" className="font-bold">
                            Total
                        </label>
                        <InputNumber id="total" value={delivery.total} onValueChange={(e) => onInputNumberChange(e, 'total')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    
                </div>

                <div className="field">
                    <label htmlFor="receptionStatus" className="font-bold">
                        Entrega
                    </label>
                    <Dropdown value={receptionStatus} onChange={(e) => setReceptionStatus(e.value)} options={receptionStatusOptions} optionLabel="name" placeholder={delivery.receptionStatus} className="w-full md:w-14rem" />
                    
                </div>

                {/*<div className="field">
                    <label htmlFor="creationDate" className="font-bold">
                        Fecha Creado
                    </label>
                    <InputText id="creationDate" disabled placeholder={delivery.creationDate}  />
                   
                </div>*/}

                {/*<div className="field">
                    <label htmlFor="deliveredDate" className="font-bold">
                        Fecha Entregado
                    </label>
                    <Calendar value={deliveredDate} onChange={(e) => setdeliveredDate(e.value)} id="deliveredDate" placeholder={delivery.deliveredDate} className={classNames({ 'p-invalid': submitted && !delivery.deliveredDate })} dateFormat="dd/mm/yy" />
                    
                </div>*/}

                {/*<div className="field">
                    <label htmlFor="payDate" className="font-bold">
                        Fecha Pagado
                    </label>
                    <Calendar value={payDate} onChange={(e) => setpayDate(e.value)} id="deliveredDate" placeholder={delivery.payDate} className={classNames({ 'p-invalid': submitted && !delivery.payDate })} dateFormat="dd/mm/yy" />
                    
                </div>*/}

                <div className="field">
                    <label htmlFor="payStatus" className="font-bold">
                        Pago
                    </label>
                    <Dropdown value={payStatus} onChange={(e) => setPayStatus(e.value)} options={payStatusOptions} optionLabel="name" placeholder={delivery.payStatus} className="w-full md:w-14rem" />
                    
                </div>

            </Dialog>

            <Dialog visible={deletedeliveryDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletedeliveryDialogFooter} onHide={hideDeletedeliveryDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {delivery && (
                        <span>
                            ¿Está seguro que desea eliminar? <b>{delivery.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deletedeliverysDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletedeliverysDialogFooter} onHide={hideDeletedeliverysDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {delivery && <span>¿Está seguro de eliminar el Envio seleccionado?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        