
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];

  constructor(private MemberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers()
  {
    this.MemberService.getMembers().subscribe(members=>{
      this.members = members;
    })
  }

}
