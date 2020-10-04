import Vue from 'vue';
import Component from 'vue-class-component';

import { StudentsDataSource, IStudent } from '@/services/data-source/';

@Component
export default class StudentsPage extends Vue {
  students: IStudent[] = []
  dialogDelete = false
  searchText = ''
  deleteId = '0'

  headers = [
    { text: 'Registro acadêmico', value: 'ra' },
    { text: 'Nome', value: 'name' },
    { text: 'CPF', value: 'cpf' },
    { text: 'Ações', value: 'actions', sortable: false },
  ]

  mounted() {
    StudentsDataSource.getAll()
      .then(({ error, result }) => {
        if (error && !result) {
          alert(error);
        } else {
          this.students = result || [];
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  /**
   * Return students that includes the 'searchText'.
   */
  get seachedStudents() {
    return this.students.filter((student) => {
      if (String(student.ra).toLowerCase().includes(this.searchText.toLowerCase())) return true;
      if (student.cpf.toLowerCase().includes(this.searchText.toLowerCase())) return true;
      if (student.name.toLowerCase().includes(this.searchText.toLowerCase())) return true;
    });
  }

  edit(id: string) {
    this.$router.push(`/alunos/${id}`);
  }

  deleting(id: string) {
    this.deleteId = id;
    this.dialogDelete = true;
  }

  deleteItemConfirm() {
    this.dialogDelete = false;
    StudentsDataSource.delete(Number(this.deleteId))
      .then(({ error }) => {
        if (error) {
          alert(error);
        } else {
          this.students = [...this.students.filter((student) => Number(student.id) !== Number(this.deleteId))];
        }
      })
      .catch((e) => alert(e));
  }
}
