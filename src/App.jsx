const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the Issue Filter.</div>
    )
  }
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (

    <tr>
    <td>{issue.id}</td>
    <td>{issue.status}</td>
    <td>{issue.owner}</td>
    <td>{issue.created.toDateString()}</td>
    <td>{issue.effort}</td>
    <td>{issue.completionDate ? issue.completionDate.toDateString(): ''}</td>
    <td>{issue.title}</td>
      </tr>
    )
  }
}

class IssueTable extends React.Component {
  render() {
     const issueRows= this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
    // const borderedStyle = {border: "1px solid silver", padding: 6};
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>CompletionDate</th>
            <th>Title</th>
         </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    )
  }
}

class IssueAdd extends React.Component {
  constructor () {
    super ();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: "new",
      created: new Date(),
    });

    form.owner.value = ""; form.title.value = "";

  }
  render() {
    return (
    <div>
      <form name= "issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder= "Owner" />
        <input type="text" name="title" placeholder= "title" />
        <button>Add</button>
      </form>
      </div>
    )
  }
}

const issues = [
  {
    id: 1, status: 'Open', owner: 'Justin',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking add',
  },
{
  id: 2, status: 'Assigned', owner: 'Pat',
  created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
  title: 'Missing bottom border on panel',
},
];

class IssueList extends React.Component {
  constructor() {
    super();
    this.state= { issues: [] };
    // this.createTestIssue = this.createTestIssue.bind(this);
    // setTimeout(this.createTestIssue.bind(this), 2000);
    this.createIssue = this.createIssue.bind(this);


  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(()=> {
      this.setState({ issues: issues});
    }, 500);
  }

  createIssue(newIssue) {
    const newIssues= this.state.issues.slice();
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue);
    this.setState({ issues: newIssues });
  }

  // createTestIssue() {
  //   this.createIssue({
  //     status: 'New', owner: 'streetEngineer', created: new Date(),
  //     title: 'Completion date should be optional',
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd  createIssue={this.createIssue} />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);    // Render the component inside the content Node
