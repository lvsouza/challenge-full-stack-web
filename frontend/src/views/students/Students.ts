import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class StudentsPage extends Vue {
    headers = [
        { text: "Registro acadêmico", value: "ra" },
        { text: "Nome", value: "name" },
        { text: "CPF", value: "cpf" },
        { text: "Ações", value: "actions", sortable: false },
    ];
    students = [
        {
            id: 1,
            ra: 123,
            name: "nome",
            cpf: "123.132.123-00",
        },
        {
            id: 2,
            ra: 122,
            name: "aome",
            cpf: "123.132.123-00",
        },
    ];

    mounted() {
        console.log("mounted");
    }

    deleting(id: string) {
        console.log(id);
    }

    edit(id: string) {
        this.$router.push('/alunos/' + id)
    }
}