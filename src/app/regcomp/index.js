import React from 'react'
import { observer, inject } from 'mobx-react'
import './index.less'
import * as urls from 'constant/urls'
import { Input,DatePicker,Modal, InputNumber,Select,Switch,Tabs,Button,Form,message  } from 'antd';
import moment  from 'moment'
import clone from 'util/clone'
import MSelect from 'util/MSelect'
import * as cd from 'constant/data'

const { Option } = Select;
const { TabPane } = Tabs;
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;



@inject('userActions', 'userStore')
@observer
class Reg extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.userActions
    this.store   = props.userStore

    this.newTabIndex = 0;
    const panes = [{
        proj_name:"",
        date_from:moment(new Date()).format("YYYY/MM/DD"),
        date_to:  moment(new Date()).format("YYYY/MM/DD"),
        work_lang:["0"],
        work_role:["0"],
        work_proj:["0"],
        work_detl:"",
        key:'1'
      }];

    this.state = {
      showexp: false,
      regtype: 0,
      activeKey: panes[0].key,
      panes,
    }
  }

  onChange = activeKey => {
    this.setState({ activeKey })
  };

  // onEdit = (targetKey, action) => {
  //   this[action](targetKey);
  // };

  // add = () => {
  //   const { panes } = this.state;
  //   const activeKey = `newTab${this.newTabIndex++}`;
  //   let expItem = {
  //     proj_name:"",
  //     date_from:moment(new Date()).format(cd.DATE_FORMAT),
  //     date_to:  moment(new Date()).format(cd.DATE_FORMAT),
  //     work_lang:["0"],
  //     work_role:["0"],
  //     work_proj:["0"],
  //     work_detl:"",
  //     key:activeKey
  //   }
  //   panes.push(expItem);
  //   this.setState({ panes, activeKey });
  // };

  // remove = targetKey => {
  //   let { activeKey } = this.state;
  //   let lastIndex;
  //   this.state.panes.forEach((pane, i) => {
  //     if (pane.key === targetKey) {
  //       lastIndex = i - 1;
  //     }
  //   });
  //   const panes = this.state.panes.filter(pane => pane.key !== targetKey)

  //   let formObj = {}
  //   let nameList= ['proj_name','date_from','date_to','work_lang','work_role','work_proj','work_detl']
  //   for(let i=0;i<panes.length;i++) {
  //     for(let j=0;j<nameList.length;j++) {
  //       formObj[`${nameList[j]}_${i+1}`] = panes[i][nameList[j]]
  //     }
  //   }

  //   this.props.form.setFieldsValue(formObj)

  //   if (panes.length && activeKey === targetKey) {
  //     if (lastIndex >= 0) {
  //       activeKey = panes[lastIndex].key;
  //     } else {
  //       activeKey = panes[0].key;
  //     }
  //   }

  //   this.setState({ panes, activeKey });
  // };

  // doReg = (e) =>{
  //   e.preventDefault();
  //   this.props.form.validateFields( async (err, values) => {
  //     if (!err) {
  //       let params = clone(values)
  //       let pwd   = params.pwd
  //       let repwd = params.repwd
  //       if (pwd !== repwd) {
  //         message.success('二回入力したパスワードが一致しません。')
  //       }else{
  //         Modal.confirm({
  //           title: 'データをログインするかどうかを確認してください?',
  //           onOk:()=> {
  //             this.regUser(params)
  //           }
  //         });
          
  //       }
  //     }
  //   })
  // }

  // regUser = async (params) => {
  //   params.count = this.state.panes.length
  //   params.birth = moment(params.birth).format("YYYY/MM/DD")
  //   if (this.state.showexp) {
  //     for(let i=1;i<this.state.panes.length+1;i++) {
  //       params[`date_from_${i},date_to_${i}`][0] = moment(params[`date_from_${i},date_to_${i}`][0]).format("YYYY/MM/DD")
  //       params[`date_from_${i},date_to_${i}`][1] = moment(params[`date_from_${i},date_to_${i}`][1]).format("YYYY/MM/DD")
  //     }
  //   }else{
  //     params.count = 0
  //   }
    
  //   let r = await this.actions.regUser(params)
  //   if (r && r.code === 200) {
  //     Modal.success({
  //       title: '登録成功！',
  //       content: 'クリックして個人ページにジャンプします。',
  //       okText:"確認",
  //       onOk() {
  //         window.location.assign(`${window.location.origin}${window.location.pathname}#/homeuser`)
  //       }
  //     })
  //   }
  // }

  // showExp = (e)=>{
  //   this.setState({ showexp: e })
  // }

  // saveVal = (id,name,e)=>{
  //   const { panes } = this.state;
  //   let val  = e.target.value
  //   panes[id][name]=val
  //   this.setState({ panes});
  // }

  // saveRange = (id,v)=>{
  //   const { panes } = this.state;
  //   panes[id]['date_from'] = v[0].format(cd.DATE_FORMAT)
  //   panes[id]['date_to']   = v[1].format(cd.DATE_FORMAT)
  //   this.setState({ panes});
  // }

  // saveMul = (id,name,e)=>{
  //   let val = []
  //   const { panes } = this.state;
  //   e.map((i)=>{val.push(i)})
  //   panes[id][name]=val
  //   this.setState({ panes});
  // }


  render() {
    const { getFieldDecorator } = this.props.form;
    let { showexp,panes,regtype } = this.state

    return (
      <div className="m-regcomp">
        <h1 className="m-reg_h1">無料企業登録フォーム</h1>
        <h2 className="m-reg_h2">基本情報をご入力ください</h2>
        <Form className="m-reg-form" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
          >
          <Form.Item label="会社名">
            {getFieldDecorator('name_comp', {
              rules: [{ required: true, message: '会社名を入力してください' }],
              // initialValue: 'liyangtom' 
            })(<Input placeholder="自由陣株式会社" />)}
          </Form.Item>
          <Form.Item label="部署">
            {getFieldDecorator('name_dept', {
              rules: [{ required: true, message: '部署を入力してください' }],
              // initialValue: 'liyangtom' 
            })(<Input placeholder="総務部、人事部、経理部、営業部、開発部等" />)}
          </Form.Item>
          <Form.Item label="担当者氏名（漢字）">
            {getFieldDecorator('name_kj', {
              rules: [{ required: true, message: '担当者氏名（漢字）を入力してください' }],
            })(<Input placeholder="自由陣　太郎"/>)}
          </Form.Item>
          <Form.Item label="担当者氏名（カナ）">
            {getFieldDecorator('name_kn', {
              rules: [{ required: true, message: '氏名（カナ）を入力してください' }],
              // initialValue: 'tom' 
            })(<Input placeholder="ジユウジン　タロウ"/>)}
          </Form.Item>
          <Form.Item label="電話番号">
            {getFieldDecorator('phone', {
              rules: [{ required: true, type:'number', min:10000000000, max:99999999999,  message: '電話番号を入力してください' }],
              // initialValue: '12345678901' 
            })(<InputNumber placeholder="01234567890（ハイフン不要）" style={{width:'100%'}} />)}
          </Form.Item>
          <Form.Item label="メールアドレス">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'メールアドレスを入力してください' }],
              // initialValue:'liyangtom@163.com'
            })(<Input placeholder="email@address.com" />)}
          </Form.Item>
          <Form.Item label="パスワード">
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: 'パスワードを入力してください' }],
              // initialValue: 'aaa' 
            })(<Input.Password placeholder=""/>)}
          </Form.Item>
          <Form.Item label="パスワード（確認用）">
            {getFieldDecorator('repwd', {
              rules: [{ required: true, message: 'パスワードを再入力してください' }],
              // initialValue: 'aaa' 
            })(<Input.Password placeholder=""/>)}
          </Form.Item>        
          <h2 className="m-reg_h2">
            <span className="m-h2-ti">案件登録（後でも可能）</span>
            <Switch onChange={this.showExp} />
          </h2>
          
          {showexp?(
            <Tabs defaultActiveKey="1" 
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.panes.map((item,index)=>{
                return (
                <TabPane key={item.key} tab={ `案件 ${index+1}` } 
                >
                  <Form.Item label="案件名">
                  {getFieldDecorator(`proj_name_${index+1}`, {
                    rules: [{ required: true, type: 'string', message: '案件名を入力してください' }],
                    initialValue: item.proj_name,
                  })(<Input placeholder="案件名" onChange={this.saveVal.bind(this,index,'proj_name')} />)}
                  </Form.Item>
                  <Form.Item label="案件説明">
                    {getFieldDecorator(`proj_detl_${index+1}`, {
                      rules: [{ required: false, type: 'string', message: '案件説明を入力してください' }],
                      initialValue: "こちらの案件はXXXXXXX向けた開発案件です。\n特徴としましてはXXXXXX。\n＜特徴記載例＞\n・案件/言語のユニーク性\n・案件が取り巻く業界の特徴、魅力\n・チームの特徴、魅力\n・働く条件や環境の魅力\n・フリーランスのキャリアアップに繋がるメッセージング"
                    })(<TextArea rows={4} onChange={this.saveVal.bind(this,index,'work_detl')}/>)}
                  </Form.Item>
                  <Form.Item label="業界">
                    {getFieldDecorator(`proj_domn_${index+1}`, {
                      rules: [{ required: true, type: 'array', message: '業界を選択してください' }],
                      initialValue: ["0"]
                    })(<MSelect className="m-form-text" data={cd.projdomnList}/>)}
                  </Form.Item>
                  <Form.Item label="稼働期間">
                    {getFieldDecorator([`date_from_${index+1}`,`date_to_${index+1}`], {
                      rules: [{ required: true,  message: '稼働期間を選択してください' }],
                      initialValue: [moment(item.date_from,cd.DATE_FORMAT), moment(item.date_to,cd.DATE_FORMAT)]
                    })(<RangePicker format={cd.DATE_FORMAT}  className="m-form-text" 
                                    onChange={this.saveRange.bind(this,index)}/>)}
                  </Form.Item>
                  <Form.Item label="勤務エリア">
                    {getFieldDecorator('proj_area', {
                    rules: [{ required: true, type: 'array', message: '勤務エリアを選択してください' }],
                    initialValue: ["0"]
                    })(<MSelect className="m-form-text" data={cd.workareaList}/> )}
                  </Form.Item>
                  <Form.Item label="こだわり">
                    {getFieldDecorator('proj_pref', {
                    rules: [{ required: true, type: 'array', message: 'こだわりを選択してください' }],
                    initialValue: ["0"]
                    })(<MSelect className="m-form-text" data={cd.projprefList}/> )}
                  </Form.Item>
                  <Form.Item label="応募対象">
                  {getFieldDecorator('proj-targ', {
                    initialValue: "0",
                    rules: [{ required: true, type: 'string', message: 'カテゴリーを選択してください' }]
                  })(<Select className="m-form-text">
                      <Option value="0">フリーランス</Option>
                      <Option value="1">協力パートナー</Option>
                      <Option value="2">副業</Option>
                    </Select>)}
                  </Form.Item>
                  <Form.Item label="働き方">
                    {getFieldDecorator('proj_styl', {
                      rules: [{ required: true, type: 'array', message: '働き方を選択してください' }],
                      initialValue: ["0"]
                    })(<MSelect className="m-form-text" data={cd.worktypeList}/>)}
                  </Form.Item>

                  <h1>ポジション別</h1>
                  
                  <Form.Item label="単価（万円）">
                    {getFieldDecorator('proj_mony', {
                      rules: [{ type: 'integer', required: true,  min:1, max:200, message: '単価を入力してください（最大200万円）' }],
                      initialValue: 10
                    })(<InputNumber placeholder="数字（単位：万円）" />)}
                  </Form.Item>
                  <Form.Item label="職種">
                    {getFieldDecorator(`proj_role_${index+1}`, {
                      rules: [{ required: true, type: 'array', message: '職種を選択してください' }],
                      initialValue: ["0"]
                    })(<MSelect className="m-form-text" data={cd.workroleList}/>)}
                  </Form.Item>
                  <Form.Item label="担当工程">
                    {getFieldDecorator(`proj_resp_${index+1}`, {
                      rules: [{ required: true, type: 'array', message: '担当工程を選択してください' }],
                      initialValue: ["0"]
                    })(<MSelect className="m-form-text" data={cd.projrespList}/>)}
                  </Form.Item>
                  <Form.Item label="作業内容">
                    {getFieldDecorator(`proj_cont_${index+1}`, {
                      rules: [{ required: false, type: 'string', message: '作業内容を入力してください' }],
                      initialValue: "XXXXXXXXを行なっている企業にて、XXXX案件に携わっていただきます。\n具体的な業務としてXXXXXXXXXXXXXXXXXXXです。\n＜作業工程＞\nXXXX〜XXXXXまで\n＜開発環境＞\nXXXXXXXXXXXXXXX\nご興味を持って頂いた方はぜひ一度お話しましょう！\n「応募する」を押して頂くと、ダイレクトメッセージができますので、\nお待ちしております！"
                    })(<TextArea rows={4} onChange={this.saveVal.bind(this,index,'work_cont')}/>)}
                  </Form.Item>
                  <Form.Item label="言語スキル">
                    {getFieldDecorator(`proj_lang_${index+1}`, {
                      rules: [{ required: true, type: 'array', message: '言語スキルを選択してください' }],
                      initialValue: ["0"]
                    })(<MSelect className="m-form-text" data={cd.worklangList}/>)}
                  </Form.Item>

                  <h1>求める経験</h1>

                  <Form.Item label="必須">
                    {getFieldDecorator(`reqr_exp_${index+1}`, {
                      rules: [{ required: false, type: 'string', message: '求める経験（必須）を入力してください' }],
                      initialValue: "XXXXXXXを使った設計/開発経験（●年経験）\nXXXXXXXの業界でのXXX経験"
                    })(<TextArea rows={4} onChange={this.saveVal.bind(this,index,'reqr_exp')}/>)}
                  </Form.Item>
                  <Form.Item label="歓迎">
                    {getFieldDecorator(`pref_exp_${index+1}`, {
                      rules: [{ required: false, type: 'string', message: '求める経験(歓迎)を入力してください' }],
                      initialValue: "XXXXXXXを使った設計/開発経験（●年経験）\nXXXXXXXの業界でのXXX経験"
                    })(<TextArea rows={4} onChange={this.saveVal.bind(this,index,'pref_exp')}/>)}
                  </Form.Item>
                </TabPane>
                ) 
              })}
            </Tabs>
          ):(<div></div>)}

          <div className="m-row fn-frc">
            <Button type="primary"  htmlType="submit" onClick={this.doReg}>登録</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const RegApp = Form.create()(Reg);

export default RegApp