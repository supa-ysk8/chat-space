<!-- # README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body  |text    |
|image |text    |              
|user|references|null: false, foreign_key:true
|group|references|null: false, foreign_key:true
### Association
- belongs_to :user
- belongs_to :group



## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name    |string |null: false, unique: true, index: true
|email   |string |null: false, 
|password|string |null: false,

### Association
- has_many :messages, dependent: :destroy, 
- has_many :groups, through: :group_users
- has_many :group_users



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, 

### Association
- has_many :messages, dependent: :destroy
- has_many :users, through: :users_groups
- has_many :group_users



## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user