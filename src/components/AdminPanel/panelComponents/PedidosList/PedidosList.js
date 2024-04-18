
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

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
    const [selectedorders, setSelectedorders] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        axios("pedidosData.json").then((res) => setorders(res.data));
    }, []);

    console.log(orders)

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

    const editorder = (order) => {
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

    const deleteSelectedorders = () => {
        let _orders = orders.filter((val) => !selectedorders.includes(val));

        setorders(_orders);
        setDeleteordersDialog(false);
        setSelectedorders(null);
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
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedorders || !selectedorders.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };


    const totalBodyTemplate = (rowData) => {
        return formatCurrency(rowData.total);
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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editorder(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteorder(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverityOrder = (order) => {
        switch (order.receptionStatus) {
            case 'ENTREGADO':
                return 'success';

            case 'PENDIENTE':
                return 'warning';

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
                return 'warning';

            case 'CANCELADO':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage orders</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
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
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedorders} />
        </React.Fragment>
    );

    return (
        <div className='totalComponent'>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={orders} selection={selectedorders} onSelectionChange={(e) => setSelectedorders(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="zone" header="Zona" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="customer-name" header="Cliente" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="total" header="Total" body={totalBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    
                    <Column field="receptionStatus" header="Enterga" body={receptionStatusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="pay-status" header="Pago" body={payStatusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={orderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="order Details" modal className="p-fluid" footer={orderDialogFooter} onHide={hideDialog}>
                {order.image && <img src={`https://primefaces.org/cdn/primereact/images/order/${order.image}`} alt={order.image} className="order-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={order.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !order.name })} />
                    {submitted && !order.name && <small className="p-error">Name is required.</small>}
                </div>
                

                

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="total" className="font-bold">
                            total
                        </label>
                        <InputNumber id="total" value={order.total} onValueChange={(e) => onInputNumberChange(e, 'total')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    
                </div>
            </Dialog>

            <Dialog visible={deleteorderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteorderDialogFooter} onHide={hideDeleteorderDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {order && (
                        <span>
                            Are you sure you want to delete <b>{order.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteordersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteordersDialogFooter} onHide={hideDeleteordersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {order && <span>Are you sure you want to delete the selected orders?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        