BEGIN;

DROP TABLE IF EXISTS company, product CASCADE;
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    pro_date DATE NOT NULL,
    exp_date DATE NOT NULL,
    company_id INTEGER REFERENCES company(id)
);

INSERT INTO company (name) VALUES
    ('Cott'),
    ('Just Us!'),
    ('Daiya'),
    ('Naya Waters');

INSERT INTO product (name, pro_date, exp_date, company_id) VALUES 
    ('brewed tea', '2018-07-13','2019-12-31', 1),
    ('specialty coffee', '2018-07-13','2019-06-30', 1),
    ('hot chocolate', '2018-02-01','2019-08-01', 1),
    
    ('air trade coffee', '2018-07-13','2019-12-31', 2),
    ('sugar', '2018-07-13','2019-06-30', 2),
    ('chocolate', '2018-02-01','2019-08-01', 2),
    
    ('Daiya Cheddar Style Shreds', '2018-07-13','2019-12-31', 3),
    ('Daiya Mozzarella Style Shreds', '2018-07-13','2019-06-30', 3),
    ('Daiya Pepper Jack Style Shreds', '2018-02-01','2019-08-01', 3),

    ('Naya natural spring water', '2018-07-13','2019-12-31', 4),
    ('Naya Zest', '2018-07-13','2019-06-30', 4),
    ('Naya Mini', '2018-02-01','2019-08-01', 4);

COMMIT;