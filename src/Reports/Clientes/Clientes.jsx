import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';


function clientesPDF(cep){

    const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;

    const reportTitle =
        {
            text: 'Buscador de Cep',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45],
            border: [true, true, true, false],  // Adiciona borda apenas na parte inferior
        };

        const dados = [
            { text: `CEP: ${cep.cep ?? ''}`, fontSize: 9 },
            { text: `Logradouro: ${cep.logradouro ?? ''}`, fontSize: 9 },
            { text: `Complemento: ${cep.complemento ?? ''}`, fontSize: 9 },
            { text: `Bairro: ${cep.bairro ?? ''}`, fontSize: 9 },
            { text: `Localidade - UF: ${cep.localidade ?? ''} - ${cep.uf ?? ''}`, fontSize: 9 }
        ];

        const details = [
            {
                ul: dados,
            }
        ];

    function Rodape(currentPage, pageCount){
        
        return[
            {
                text: currentPage + ' / ' + pageCount,
                fontSize: 9,
                alignment: 'right',
                margin: [0, 10, 20, 0],
                color: '#333', 
            }
        ]
    }

    const docDefinicao = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [details],
        footer: Rodape,
        styles: {
            text: { color: '#333' },  // Cor do texto
            header: { fontSize: 18, bold: true, color: '#333' },  // Estilo do cabeçalho
    },
};

    pdfMake.createPdf(docDefinicao).download();
}

export default clientesPDF;