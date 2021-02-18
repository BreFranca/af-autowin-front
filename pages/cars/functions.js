import { columnText } from '../../components/table-search'

export const columns = [
    columnText({
        title: 'Nº Envelope',
        key: 'envelopeId'
    }),
    columnText({
        title: 'Marca',
        key: 'brand'
    }),
    columnText({
        title: 'Modelo',
        key: 'model'
    }),
    {
        title: 'Ano Fab / Ano Modelo',
        dataIndex: 'year',
        key: 'Ano Fab / Ano Modelo',
        render: (text, record) => {
            return `${record.yearFab}/${record.yearModel}`
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <div>'TSG'</div>
            // <Space size="middle">
            //     <a>Invite {record.name}</a>
            //     <a>Delete</a>
            // </Space>
        ),
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: tags => (
    //         <>
    //         TAG
    //             {/* {tags.map(tag => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })} */}
    //         </>
    //     ),
    // }
];

export const data = [
    {
        key: '1',
        envelopeId: '0001',
        brand: 'GM - Chevrolet',
        model: 'Celta',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
        yearModel: '2009',
        yearFab: '2009'
    },
    {
        key: '2',
        envelopeId: '0002',
        brand: 'Volkswagem',
        model: 'Golf',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
        yearModel: '2011',
        yearFab: '2011'
    },
    {
        key: '3',
        envelopeId: '0003',
        brand: 'Ford',
        model: 'Ecosport',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
        yearModel: '2015',
        yearFab: '2016'
    },
];