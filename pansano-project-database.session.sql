SELECT 
    v.id,
    v.created_date,
    c.name AS nombre_cliente,
    c.lastname AS apellido,
    ve.name AS estado_entrega,
    v.delivered_date AS fecha_entrega,
    vp.payed_date AS fecha_pagado,
    vp.pay_status AS estado_pago,
    vp.pay_method AS método_pago,
    v.total_mount
FROM
    ventas_ventas v
JOIN
    clientes_clientes c
ON
    v.customer_id = c.id
JOIN
    ventas_estado_entrega ve
ON
    v.delivery_state_id = ve.id
JOIN 
    ventas_pago vp
ON
    v.pay_id = vp.id



    