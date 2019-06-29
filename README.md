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
|body  |text    |null: false, 
|image |text    |              
|user_id|integer|null: false, foreign_key:true

### Association
- belongs_to :user
- belongs_to :group



## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name    |string |null: false, 
|email   |string |null: false, 
|password|string |null: false,

### Association
- has_many :messages, dependent: :destroy
- has_many :groupes, through: :users_groupes
- has_many :users_groupes



## groupesテーブル

|Column|Type|Options|
|------|----|-------|
|group|string|null: false, 

### Association
- has_many :messages, dependent: :destroy
- has_many :users, through: :users_groupes
- has_many :users_groupes



## users_groupesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user